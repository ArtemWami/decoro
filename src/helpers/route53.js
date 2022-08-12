const { route53: config } = require('../services/aws/config');

const ACTION_CREATE = 'CREATE';
const ACTION_DELETE = 'DELETE';
const RECORD_TYPE_CNAME = 'CNAME';

const createChangeBatch = (changes, comment) => ({
  Changes: changes,
  Comment: comment,
});

const createChange = ({
  action = ACTION_CREATE,
  resourceRecordSet: {
    name,
    type = RECORD_TYPE_CNAME,
    resourceRecords: [{ value }],
    ttl = 300,
  },
}) => ({
  Action: action,
  ResourceRecordSet: {
    Name: name,
    Type: type,
    TTL: ttl,
    ResourceRecords: [{ Value: value }],
  },
});

const buildDomainName = (subdomainName) => `${subdomainName}.${config.domainName}`;
const buildChangeBatches = (batches) =>
  createChangeBatch(
    batches.map(({ name, action }) =>
      createChange({
        action,
        resourceRecordSet: {
          name,
          resourceRecords: [{ value: config.resourceRecordValue }],
        },
      }),
    ),
  );

const buildChangeBatchByName = (name, action) =>
  createChangeBatch([
    createChange({
      action,
      resourceRecordSet: {
        name,
        resourceRecords: [{ value: config.resourceRecordValue }],
      },
    }),
  ]);

module.exports = {
  ACTION_CREATE,
  ACTION_DELETE,
  RECORD_TYPE_CNAME,
  createChange,
  createChangeBatch,
  buildDomainName,
  buildChangeBatches,
  buildChangeBatchByName,
};
