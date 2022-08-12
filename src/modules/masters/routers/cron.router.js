const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { getStatus, runTask } = require('../controllers/cron.controller');

const router = Router();

router.get('/status', wrap(getStatus));
router.post('/run/:alias', wrap(runTask));

module.exports = router;
