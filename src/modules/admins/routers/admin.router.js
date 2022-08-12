const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const  adminController = require('../controllers/admin.controller');

const router = Router();

router.patch('/password', wrap(adminController.setNewPassword));
router.patch('/', wrap(adminController.updateAdmin));

module.exports = router;
