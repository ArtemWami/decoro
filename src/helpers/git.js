const childProcess = require('child_process');
const getRevision = () =>
    childProcess.execSync(`git rev-parse HEAD`).toString().trim();

module.exports = {
    getRevision,
};
