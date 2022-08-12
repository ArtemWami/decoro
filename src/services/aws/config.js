// require("dotenv").config();

const {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_SES_ENABLED,
  AWS_SES_REGION,
  EMAIL_SOURCE,
  EMAIL_REPLY_TO,
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  S3_BUCKET,
  S3_REGION,
  AWS_ROUTE53_DOMAIN_NAME,
  AWS_ROUTE53_HOSTED_ZONE_ID,
  AWS_ROUTE53_RESOURCE_RECORD_VALUE,
} = process.env;

module.exports = {
  auth: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
  ses: {
    region: AWS_SES_REGION,
    enabled: AWS_SES_ENABLED === 'true',
  },
  emails: {
    from: EMAIL_SOURCE,
    reply: EMAIL_REPLY_TO,
  },
  s3: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    bucket: S3_BUCKET,
    region: S3_REGION,
    signatureVersion: 'v4',
  },
  route53: {
    domainName: AWS_ROUTE53_DOMAIN_NAME,
    hostedZoneId: AWS_ROUTE53_HOSTED_ZONE_ID,
    resourceRecordValue: AWS_ROUTE53_RESOURCE_RECORD_VALUE,
  },
};
