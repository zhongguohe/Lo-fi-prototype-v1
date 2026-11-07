# Handoff verification — 2026-11-07

This maintenance task inspects and archives the existing application. It does not repeat the complete prior UI walkthrough, redesign the app, or conduct participant testing. Historical browser evidence is preserved in development-verification.md. Current feature-status evidence labels are explained in PROJECT_STATUS.md.

## Inspection and source integrity

- Inspected package.json / package-lock.json, index.html, src, tests, CSS, existing Markdown requirements/verification, and three retained text extracts.
- Copied the three previously supplied original DOCX files from their existing user-provided paths; checked copy hashes against the source bytes. No diagram-image reanalysis or new literature review is claimed.
- No custom Vite config or public assets were used. The unused pnpm setup placeholder was moved to local work/handoff-audit and excluded.
- Existing UI/source/test/entry/package hashes are recorded before documentation edits and compared at completion. The original README and verification notes are retained in this V1 directory.
- Goal issue reproduction: base goal 60, effective scheduled goal 90, then replacement with a future goal can make the current goal 60 again. This is documented as K01, not fixed here.

## Validation runs

Results below were recorded after the commands completed. Packaging excludes node_modules, dist, .git, environment files, key files, caches, local work/outputs/logs and participant-data/private directories. The allowlisted ZIP is checked for safe paths, CRC and per-file SHA-256 hashes. Original DOCX copy hashes are in original-documents/source-manifest.json.

### Existing workspace checks

- `npm install`: passed; 23 packages audited, 0 reported vulnerabilities. This is the install command's report, not an exhaustive security audit. The available npm runtime blocked esbuild/fsevents install scripts by policy; the actual build still succeeded using installed packages.
- `npm test`: 15 passed, 0 failed.
- `npm run build`: passed. Vite emitted nonblocking React Router `use client` directive warnings; no compile failure.
- Source integrity: all 10 baseline files (src files, tests, index.html and package.json) remained byte-identical after documentation work.
- All current local Markdown links resolved. Original DOCX copy hashes matched their supplied originals. A bounded pattern scan of text and DOCX XML found no supported token/private-key pattern; this is not a universal guarantee against all sensitive information.
- The current packaging task has not rerun a full browser flow or physical-phone matrix. Historical browser checks are not reclassified as new checks.


### Extracted-package checks

- Runtime used for this handoff: Node.js v24.22.1 and npm 12.2.2. Other supported runtime versions were not separately exercised.
- The source ZIP was extracted under a fresh local work/handoff-audit directory. It contained one root, SI684-Health-Technology/, with 42 files including the generated per-file manifest.
- ZIP CRC, safe relative paths, required root files and each manifest SHA-256: passed.
- Independent extracted project `npm ci`: passed (22 packages installed); `npm test`: 15 passed, 0 failed; `npm run build`: passed. The same nonblocking dependency/tool warnings appeared; no installation/test/build command failed.
- Excluded paths were absent: dependencies, builds, Git metadata, .env files, key files, caches, coverage, scratch work, prior exports, logs. No runtime browser activity data or npm tool runtime was copied.
- Final documentation-only packaging is regenerated after recording these results. The final archive is checked again, and its extracted source hashes must equal the already-tested extracted code. The outer archive SHA-256 is emitted separately beside the ZIP to avoid self-referential hashes.

### Limits

The scanner recognizes a bounded set of token/private-key patterns and explicitly excluded filenames, rather than proving the absence of every conceivable sensitive item. The three original design documents are intentionally retained with their normal document metadata and group names. Participant testing and identifying raw research data are not in this archive. No public repository, push, deployment or external upload was performed.
