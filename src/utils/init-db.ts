export const initDb = () => {
  // Register proxy-service so other JS context's can get or insert favicons
  const urlService = registerUrlService();

  setTimeout(() => {
    let syncUrlsIsBusy = false;

    const syncUrls = async () => {
      if (syncUrlsIsBusy) return;

      syncUrlsIsBusy = true;
      console.log('syncUrlsIsBusy', syncUrlsIsBusy);

      const response = await getStreamArray('https://hblock.molinero.dev/hosts');

      urlService.upsertBulk(response);

      syncUrlsIsBusy = false;
      console.log('syncUrlsIsBusy', syncUrlsIsBusy);
    };

    setTimeout(async () => {
      try {
        const res = await urlService.count();

        console.log('urlService.count', res);
      } catch (error) {
        console.error(error);
      }

      syncUrls();
    }, 1000);

    setInterval(syncUrls, 5000);
  }, 750);
};
