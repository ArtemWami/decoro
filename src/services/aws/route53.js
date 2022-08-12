const { route53 } = require('./client');
const { route53: config } = require('./config');

const listResourceRecordSets = (hostedZoneId = config.hostedZoneId) =>
  route53.listResourceRecordSets({ HostedZoneId: hostedZoneId }).promise();

const changeResourceRecordSets = (changeBatch, hostedZoneId = config.hostedZoneId) =>
  route53
    .changeResourceRecordSets({ HostedZoneId: hostedZoneId, ChangeBatch: changeBatch })
    .promise();

module.exports = {
  listResourceRecordSets,
  changeResourceRecordSets,
};
