const { logger, getInfoObject } = require('../logger');

const metaMap = new WeakMap();

const getMeta = (obj, defaultMeta) => {
  let meta = metaMap.get(obj);
  if (!meta) {
    meta = defaultMeta;
    metaMap.set(obj, defaultMeta);
  }

  return meta;
};

const manage = (run) => {
  const meta = getMeta(run, {
    error: null,
    isActive: true,
    isRunning: false,
    lastAttempt: null,
    lastRun: null,
    lastFinished: null,
  });

  return async () => {
    const lastAttempt = new Date();
    meta.lastAttempt = lastAttempt;
    if (meta.isRunning || !meta.isActive) {
      return undefined;
    }

    try {
      meta.error = null;
      meta.isRunning = true;
      meta.lastRun = lastAttempt;
      await run();
    } catch (err) {
      meta.error = err.message;
      logger.error(getInfoObject(err));
    }

    meta.lastFinished = new Date();
    meta.isRunning = false;
    return undefined;
  };
};

module.exports = {
  getMeta,
  manage,
};
