const processCompanyInactive = require('./processCompanyInactive');
const processBeginningOfCampaign = require('./processBeginningOfCampaign');

const startJobs = () => {
    processCompanyInactive.job.start();
    processBeginningOfCampaign.job.start();
};

module.exports = {
    processCompanyInactive,
    processBeginningOfCampaign,
    startJobs,
};
