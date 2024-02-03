import NodeCache from 'node-cache';

export const LocalCache = new NodeCache({
    stdTTL: 10,
    checkperiod: 10,
  });