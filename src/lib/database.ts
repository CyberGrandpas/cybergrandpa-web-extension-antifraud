import loki, { LokiPartitioningAdapter } from 'lokijs';

const newDbInit = (dbname: string) => {
  const LokiIndexedAdapter = loki.prototype.getIndexedAdapter();
  const idbAdapter = new LokiIndexedAdapter(dbname);

  // use paging only if you expect a single collection to be over 50 megs or so
  const pa = new LokiPartitioningAdapter(idbAdapter, { paging: true });

  const db = new loki(dbname, {
    adapter: pa,
    autoload: true,
    autosave: true,
    autosaveInterval: 4000,
  });

  return db;
};

export { newDbInit };
