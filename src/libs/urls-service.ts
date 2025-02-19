import { convertReadableStreamToString, createStore, decompressReadableStream, getArrayFromString } from '@/utils';
import type { UrlService } from '@/utils/types';
import { defineProxyService } from '@webext-core/proxy-service';
import { StorageItemKey } from 'wxt/storage';

const createUrlService = (storageKey: StorageItemKey): UrlService => {
  const urlsDb = createStore<string | null>(null, storageKey);

  let arr: string[] = [];

  const v = async () => {
    const base64string = await urlsDb.ready();

    if (!base64string) {
      return [];
    }

    const stream = decompressReadableStream(base64string);
    const streamToText = await convertReadableStreamToString(stream);

    return getArrayFromString(streamToText, (x) => x.startsWith('0.0.0.0'), '0.0.0.0');
  };

  urlsDb.subscribe(async (value) => {
    if (value) {
      arr = await v();
    }
  });

  return {
    count: () => {
      return arr.length;
    },
    getRows: (limit, offset = 0) => {
      return arr.slice(offset, offset + limit).join('\n');
    },
    seek: (url) => {
      return arr.includes(url);
    },
    upsert: async (base64string: string) => {
      return await urlsDb.set(base64string);
    },
  };
};

export const [registerUrlService, getUrlService] = defineProxyService('url-service', createUrlService);
