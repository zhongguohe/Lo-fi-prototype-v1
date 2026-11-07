# GitHub Pages publication

## Current authorization and status

The user authorized uploading the existing project and Pages configuration to the shared public repository `zhongguohe/Lo-fi-prototype-v1`. The signed-in collaborator Songzbin1 cannot manage repository options. The user explicitly chose to upload code/configuration first and wait for the owner to enable Pages. A live demo must not be called verified until it is actually deployed and opened successfully.

## Owner's one-time step

In the repository, open Settings → Pages → Build and deployment → Source, choose **GitHub Actions**. Then open Actions → “Test and deploy Lo-fi V1 to GitHub Pages” and run the workflow on main if no new push triggers it. If workflow access or environment approval is restricted, the owner must resolve that restriction. Do not create tokens or send credentials to collaborators.

## What the code does

- `.github/workflows/pages.yml` installs locked dependencies, runs tests, and builds the app using `/Lo-fi-prototype-v1/` derived from the repository name. It publishes only dist, not research DOCX files or the source directory.
- `vite.config.js` reads DEPLOY_BASE_PATH. The default remains `/` for local usage.
- `src/main.jsx` uses HashRouter in production, so a direct link such as `/Lo-fi-prototype-v1/#/progress` and refresh do not require server-side route rewriting. Development uses the original BrowserRouter paths.
- No intervention, visual style, page contents or reward rules change.

Expected URL after a successful deployment: `https://zhongguohe.github.io/Lo-fi-prototype-v1/`. This is an expected address, not a claim of current availability. Confirm the successful Actions deployment's returned URL and actually open it before sharing it as a working demo.

## Local preflight

```bash
npm ci
npm test
DEPLOY_BASE_PATH=/Lo-fi-prototype-v1/ npm run build
```

Use an ordinary static server with the output mounted under `/Lo-fi-prototype-v1/`. Check Setup, all four tabs, Personal Center, nested hash-link refresh, and the error log without relying on an SPA fallback. Record exact results and limits in PROJECT_STATUS / prototypes/lo-fi-v1/github-publication.md.

Each visitor's records remain in their own browser/localStorage. There is no group synchronization, account or sensor service. Existing known V1 issues remain documented; deployment checks do not establish health effectiveness.

Official guidance used for the configuration: [Vite static deployment](https://vite.dev/guide/static-deploy.html#github-pages) and [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
