require('./config-env');

const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const Sentry = require('@sentry/node');

const { specs } = require('./swagger');
const v10Router = require('./src/modules/guests/routers/v1.0.router');
const v11Router = require('./src/modules/masters/routers/v1.1.router');
const v12Router = require('./src/modules/admins/routers/v1.2.router');
const v13Router = require('./src/modules/adminManagers/routers/v1.3.router');
const v14Router = require('./src/modules/teamMembers/routers/v1.4.router');
const v15Router = require('./src/modules/owners/routers/v1.5.router');
const { handleErrors } = require('./src/middlewares/errors');
const { dbAuthenticate } = require('./src/helpers/connections');
const { startJobs } = require('./src/cron');
const { sequelize } = require('./models');
const { logger } = require('./src/base/logger');
const { getRevision } = require('./src/helpers/git');

const { PORT, LOGGER_FORMAT, SENTRY_DSN, API_ENVIRONMENT } = process.env;

Sentry.init({
    dsn: SENTRY_DSN,
    environment: API_ENVIRONMENT,
    initialScope: { tags: { commit: getRevision() } },
});

const app = express();
if (LOGGER_FORMAT) {
    const skipOptions = (req) => req.method === 'OPTIONS';
    app.use(morgan(LOGGER_FORMAT, { skip: skipOptions }));
}

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(express.text({ type: 'application/xml' }));

const buildPath = path.join(__dirname, '/public/build');
if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
}

app.use('/docs.html', swaggerUi.serve, swaggerUi.setup(specs));

/** Exceptions are used without checking the token and roles. */
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use('/api/v1.0', v10Router);
app.use('/api/v1.1', v11Router);
app.use('/api/v1.2', v12Router);
app.use('/api/v1.3', v13Router);
app.use('/api/v1.4', v14Router);
app.use('/api/v1.5', v15Router);

if (fs.existsSync(buildPath)) {
    app.get('/*', (req, res) => {
        res.sendFile(buildPath + '/index.html');
    });
}

app.use(handleErrors);

(async () => {
    await dbAuthenticate(sequelize);
    await startJobs();
    app.listen(PORT, () => logger.info(`API on port ${PORT}`));
})();
