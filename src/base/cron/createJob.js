const { CronJob } = require('cron');
const { DEFAULT_TIMEZONE_CRON = 'America/New_York' } = process.env;

const createJob = ({
    cronTime,
    onTick,
    onComplete,
    runOnInit,
    context,
    unrefTimeout,
    start,
    timezone = DEFAULT_TIMEZONE_CRON,
}) => new CronJob(cronTime, onTick, onComplete, start, timezone, context, runOnInit, unrefTimeout);

module.exports = createJob;
