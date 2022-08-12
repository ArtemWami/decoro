const roomService = require('../../../services/room');

/**
 * Get rooms list
 * */
const getRooms = async (req, res) => {
    const rooms = await roomService.findRoom.all.listParents();
    res.json({ data: rooms });
};

module.exports = {
    getRooms,
};
