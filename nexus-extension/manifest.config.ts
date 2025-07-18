import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  name: 'Upwork Scraper',
  description: 'Scrape Upwork jobs using Vue + CRXJS',
  version: '1.0.0',
  manifest_version: 3,
  permissions: ['scripting', 'activeTab'],
  host_permissions: ['https://www.upwork.com/*'],
  content_scripts: [
    {
      matches: ['https://www.upwork.com/*'],
      js: ['content/content.js'],  // adjust to output path of your built content script
      run_at: 'document_idle'
    }
  ],
  action: {
    default_popup: 'popup/index.html', // same here, relative to dist root
  }
});
