import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  outDir: 'dist',
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-svelte', '@wxt-dev/i18n/module'],
  manifest: {
    manifest_version: 3,
    name: '__MSG_extension_name__' + ' ' + '__MSG_extension_subname__',
    description: '__MSG_extension_description__',
    default_locale: 'en',
    permissions: [
      'activeTab',
      'alarms',
      'declarativeNetRequest',
      'declarativeNetRequestWithHostAccess',
      'scripting',
      'storage',
      'tabs',
    ],
    host_permissions: ['<all_urls>'],
    web_accessible_resources: [
      {
        matches: ['<all_urls>'],
        resources: ['/icon/*.png'],
      },
    ],
  },
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
});
