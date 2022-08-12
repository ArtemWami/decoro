const aws = require('aws-sdk');
const config = require('./config');

const route53 = new aws.Route53(config.auth);

const ses = new aws.SES({
  ...config.auth,
  region: config.ses.region,
});

const s3 = new aws.S3(config.s3);

module.exports = {
  route53,
  ses,
  s3
};
