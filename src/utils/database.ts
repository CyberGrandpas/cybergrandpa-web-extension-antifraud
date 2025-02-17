import Dexie from 'dexie';

const urlsDb = new Dexie('urls-db');

urlsDb.version(1).stores({
  urls: 'url',
});

export { urlsDb };
