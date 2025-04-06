// import { getTabId } from '@/utils/get-tab-id';

const main = () => {
  return window.confirm('Page with risks!\nDo you want to close it?');
  // const answer = window.confirm('Page with risks!\nDo you want to close it?');
  // const tabId = await getTabId();
  // console.log('details.url', tabId);
  // if (answer) {
  //   browser.tabs.remove(tabId!);
  //   window.stop();
  //   // await sendMessage({ tabId, type: 'stopHostPageLoading' });
  //   // browser.runtime.sendMessage({
  //   //   tabId,
  //   //   type: 'stopHostPageLoading',
  //   // });
  // }
};

export default defineContentScript({
  registration: 'runtime',
  world: 'MAIN',
  matches: ['<all_urls>'],
  main,
});
