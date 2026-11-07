import { defineConfig } from 'vite';

// Local builds use /. GitHub Actions supplies /<repository>/ for project Pages.
export default defineConfig({
  base: process.env.DEPLOY_BASE_PATH || '/',
});
