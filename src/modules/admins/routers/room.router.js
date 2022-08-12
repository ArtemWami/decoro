const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const roomController = require('../controllers/room.controller');

const router = Router();

router.get('/', wrap(roomController.getRooms));

module.exports = router;
