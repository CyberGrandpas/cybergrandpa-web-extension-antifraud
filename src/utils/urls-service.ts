import { defineProxyService } from '@webext-core/proxy-service';
import { urlsDb } from './database';
import type { UrlService } from './types';

function createUrlService(): UrlService {
  const TABLE_NAME = 'urls';

  return {
    async count() {
      return await urlsDb.table(TABLE_NAME).count();
    },
    async getSome(limit: number) {
      return await urlsDb.table(TABLE_NAME).orderBy('id').limit(limit).toArray();
    },
    async findAll(url: string) {
      return await urlsDb.table(TABLE_NAME).where('url').equalsIgnoreCase(url).toArray();
    },
    async getAll() {
      return await urlsDb.table(TABLE_NAME).orderBy('id').toArray();
    },
    async upsert(info) {
      const res = await urlsDb.table(TABLE_NAME).put(info);

      return res;
    },
    async upsertBulk(info: string[]) {
      const infoArray = info.map((url) => ({ url }));
      const res = await urlsDb.table(TABLE_NAME).bulkPut(infoArray);

      return res;
    },
  };
}

export const [registerUrlService, getUrlService] = defineProxyService('url-service', createUrlService);
