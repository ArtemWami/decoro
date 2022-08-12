const sanitizeHtml = require('sanitize-html');

const { AWS_ROUTE53_DOMAIN_NAME } = process.env;
const buildFrom = (from) => `${from}@${AWS_ROUTE53_DOMAIN_NAME}`;

const buildUrl = ({ name: subdomainName }, path) =>
    `https://${subdomainName}.${AWS_ROUTE53_DOMAIN_NAME}${path}`;

const buildLink = (url) => `<a href="${url}">${url}</a>`;

const sanitize = (html, options = { allowedTags: [] }) => sanitizeHtml(html, options);

const render = (template, data) =>
    Object.keys(data).reduce(
        (tmp, key) => tmp.replaceAll(`{{${key}}}`, data[key]),
        String(template)
    );

module.exports = {
    buildFrom,
    buildUrl,
    buildLink,
    sanitize,
    render,
};
