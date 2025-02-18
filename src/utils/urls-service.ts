import { defineProxyService } from '@webext-core/proxy-service';
import { newDbInit } from '../lib/database';
import type { UrlService } from './types';

function createUrlService(): UrlService {
  const urlsDb = newDbInit('urls-db');
  const table = urlsDb.addCollection('urls', { unique: ['url'], indices: ['url'] });

  return {
    count() {
      return table.count();
    },
    getSome(limit: number) {
      return table.chain().limit(limit).data();
    },
    findAll(url: string) {
      return table
        .chain()
        .where((info) => url.search(info.url) !== -1)
        .data();
    },
    upsert(info) {
      return table.insert(info);
    },
    upsertBulk(info: string[]) {
      const infoArray = info.map((url) => ({ url }));
      const response = infoArray.map((info) => table.insert(info));

      return response.length;
    },
  };
}

export const [registerUrlService, getUrlService] = defineProxyService('url-service', createUrlService);
