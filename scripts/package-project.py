#!/usr/bin/env python3
"""Package the portable source only; no dependencies, credentials, exports or local data."""
from pathlib import Path, PurePosixPath
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'outputs' / 'SI684-Health-Technology-LoFiV1.zip'
PREFIX = 'SI684-Health-Technology/'
ROOT_FILES = ['AGENTS.md', 'README.md', 'PROJECT_STATUS.md', 'CHANGELOG.md',
              '.gitignore', 'package.json', 'package-lock.json', 'index.html']
TREES = ['src', 'tests', 'docs', 'prototypes', 'scripts', '.github']
OPTIONAL = ['vite.config.js', 'vite.config.mjs', 'public', '.env.example']
EXCLUDED = {'node_modules', 'dist', '.git', '.vite', 'coverage', 'work', 'outputs',
            '__pycache__', 'participant-data', 'private', '.idea', '.vscode'}
SECRET_PATTERNS = [re.compile(r'\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}'),
                   re.compile(r'\bgh[pousr]_[A-Za-z0-9]{30,}'),
                   re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----')]

def excluded(path):
    return (any(p in EXCLUDED for p in path.parts)
            or path.name in {'.DS_Store', 'Thumbs.db', '.npmrc'}
            or (path.name.startswith('.env') and path.name != '.env.example')
            or path.suffix.lower() in {'.pem', '.key', '.p12', '.pfx', '.log', '.zip', '.pyc'})

def digest(data):
    return hashlib.sha256(data).hexdigest()

def main():
    candidates = [ROOT / name for name in ROOT_FILES]
    for name in TREES + OPTIONAL:
        path = ROOT / name
        if path.is_dir():
            candidates.extend(p for p in path.rglob('*') if p.is_file())
        elif path.is_file():
            candidates.append(path)
    members = {}
    for path in sorted(set(candidates)):
        relative = path.relative_to(ROOT)
        if excluded(relative):
            continue
        if path.is_symlink():
            raise RuntimeError(f'Refusing symlink: {relative}')
        data = path.read_bytes()
        if path.suffix.lower() in {'.js', '.jsx', '.css', '.html', '.json', '.md', '.py', '.example'}:
            text = data.decode('utf-8')
            if any(pattern.search(text) for pattern in SECRET_PATTERNS):
                raise RuntimeError(f'Possible secret detected; review file without printing its value: {relative}')
        members[relative.as_posix()] = data
    for required in ROOT_FILES:
        if required not in members:
            raise RuntimeError(f'Missing required file: {required}')
    manifest = {'root': PREFIX.rstrip('/'), 'format': 1,
                'note': 'Manifest hashes cover all packaged files except this generated manifest itself.',
                'files': {name: {'sha256': digest(data), 'bytes': len(data)} for name, data in members.items()}}
    members['PACKAGE_MANIFEST.json'] = (json.dumps(manifest, indent=2, ensure_ascii=False) + '\n').encode()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(OUTPUT, 'w', ZIP_DEFLATED) as archive:
        for name, data in members.items():
            archive.writestr(PREFIX + name, data)
    with ZipFile(OUTPUT) as archive:
        assert archive.testzip() is None, 'ZIP CRC validation failed'
        for name in archive.namelist():
            path = PurePosixPath(name)
            assert name.startswith(PREFIX) and '..' not in path.parts and not path.is_absolute()
            assert not excluded(PurePosixPath(*path.parts[1:])), f'Excluded entry: {name}'
        for name, info in manifest['files'].items():
            assert digest(archive.read(PREFIX + name)) == info['sha256'], name
    sha = digest(OUTPUT.read_bytes())
    OUTPUT.with_suffix('.zip.sha256').write_text(f'{sha}  {OUTPUT.name}\n')
    print(json.dumps({'archive': str(OUTPUT), 'files': len(members), 'bytes': OUTPUT.stat().st_size,
                      'sha256': sha, 'crc_and_file_hashes': 'passed'}, indent=2))

if __name__ == '__main__':
    main()
