import { CONFIG_LOCAL_URL_PATTERN } from '@/config';
import { getUrlService } from './urls-service';

export const initWebBlocking = () => {
  const urlService = getUrlService();

  browser?.webNavigation?.onBeforeNavigate?.addListener(
    async (details) => {
      // const isUrlBlocked = await urlService.seek('---adbs186282--54223580950k.gbc.criteo.com');
      const isUrlBlocked = await urlService.seek(details.url);

      console.log('URL:', isUrlBlocked, details.url);
    },
    { url: CONFIG_LOCAL_URL_PATTERN }
  );
};
