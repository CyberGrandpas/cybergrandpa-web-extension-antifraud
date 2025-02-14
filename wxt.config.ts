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
    // for wasm
    // web_accessible_resources: [
    //   {
    //     // We'll use this matches in the cotent script as well
    //     matches: ['*://*.github.com/*'],
    //     // OR
    //     matches: ['<all_urls>'],
    //     // Use the same path as `relativeDest` from the WXT module
    //     resources: ['/oxc_parser_wasm_bg.wasm'],
    //   },
    // ],
    permissions: [
      'storage',
      'scripting',
      'activeTab',
      'tabs',
      'declarativeNetRequest',
      'declarativeNetRequestWithHostAccess',
    ],
    host_permissions: [''],
    web_accessible_resources: [
      {
        matches: ['<all_urls>'],
        resources: ['/components/apps/*.svelte', '/icon/*.png'],
      },
    ],
  },
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
});
