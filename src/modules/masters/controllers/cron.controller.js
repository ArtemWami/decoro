const { manager } = require('../../../base/cron');
const { processCompanyInactive, processBeginningOfCampaign } = require('../../../cron');
const { NotFoundError } = require('../../../errors');

const tasks = [processCompanyInactive, processBeginningOfCampaign];

const getStatus = async (req, res) => {
    const info = tasks.reduce((acc, task) => {
        if (task.cronId) {
            acc[task.cronId] = manager.getMeta(task.onTick);
        }

        return acc;
    }, {});

    res.json(info);
};

const runTask = async (req, res) => {
    const { alias } = req.params;
    const task = tasks.find((job) => job.alias === alias);
    if (!task) {
        throw new NotFoundError({ message: 'Task not found' });
    }

    const run = manager.manage(task.onTick);
    run();
    res.json(manager.getMeta(task.onTick));
};

module.exports = {
    getStatus,
    runTask,
};
