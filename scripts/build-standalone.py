#!/usr/bin/env python3
"""Inline a Vite production build into a portable, offline HTML preview."""
from pathlib import Path
import re
root = Path(__file__).resolve().parents[1]
html = (root / 'dist/index.html').read_text()
def script(match):
    asset = root / 'dist' / match.group(1).lstrip('/')
    # Only local hashed build assets; never fetch external URLs.
    if not asset.resolve().is_relative_to((root / 'dist').resolve()):
        raise ValueError('Invalid asset path')
    return '<script type="module">' + asset.read_text().replace('</script', '<\\/script') + '</script>'
def style(match):
    asset = root / 'dist' / match.group(1).lstrip('/')
    if not asset.resolve().is_relative_to((root / 'dist').resolve()):
        raise ValueError('Invalid asset path')
    return '<style>' + asset.read_text() + '</style>'
html = re.sub(r'<script[^>]+src="([^"]+)"[^>]*></script>', script, html)
html = re.sub(r'<link[^>]+href="([^"]+\.css)"[^>]*>', style, html)
(root / 'MoveMore-Prototype2.html').write_text(html)
print('Created MoveMore-Prototype2.html (offline, self-contained)')
