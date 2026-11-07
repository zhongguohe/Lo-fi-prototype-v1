# GitHub publication verification — 2026-11-07

## Scope and authorization

Upload the existing project and Pages configuration to the shared public repository zhongguohe/Lo-fi-prototype-v1. The user explicitly selected “upload first, wait for owner to enable Pages.” Current collaborator Songzbin1 cannot access repository options. No new repository or token is created. Source upload must be confirmed from the actual remote tree; online success requires a later real Pages deployment/browser check.

## Local preflight

- DEPLOY_BASE_PATH=/Lo-fi-prototype-v1/ npm run build: passed. Built HTML references the correct prefixed assets. Nonblocking React Router use-client warnings remain.
- npm test: 15 passed, 0 failed.
- Production dist mounted at /Lo-fi-prototype-v1/ on Python's plain static server, without SPA rewrite fallback.
- Setup saved preferences; Home and all four navigation areas loaded; Personal Center loaded. Reloading /Lo-fi-prototype-v1/#/personal preserved the correct view and saved profile/settings.
- These checks cover deployment-path/navigation compatibility, not a new full functional evaluation or physical-device test.

## Remote results

- Repository: https://github.com/zhongguohe/Lo-fi-prototype-v1
- Source/config snapshot: fcdadfcf6070ce4400d5b2ef4b0c8da79d8a5d38. All 61 files were fetched using public Git and compared byte for byte against the curated upload set: no differences or missing files.
- A fresh copy of that remote tree passed npm ci, npm test (15 passed, 0 failed), and DEPLOY_BASE_PATH=/Lo-fi-prototype-v1/ npm run build. React Router emitted nonblocking use-client warnings. Install reported no vulnerabilities.
- GitHub Actions run #1: https://github.com/zhongguohe/Lo-fi-prototype-v1/actions/runs/42413227164. Build succeeded (17s); deploy failed at configure-pages with Not Found / Get Pages site failed. This confirms Pages activation is still required; it does not indicate a source compilation failure.
- Documentation-only follow-up commits record these results; runtime files remain identical to the checked snapshot.
- Owner next action: Settings → Pages → Source: GitHub Actions, then rerun the workflow. Public URL verification is still unperformed; do not report the expected github.io URL as an available demo.
- Teammates can already clone/download the source, use Node.js 24, run npm ci then npm run dev, and open the local URL Vite prints. Opening index.html directly does not run the React app. Each browser stores its own demo data.
