const { Room } = require('../../../models');

const findRoom = {
    all: {
        listParents: () =>
            Room.findAll({
                where: { parentId: null },
                include: ['compartments'],
                order: [
                    ['order_id', 'ASC'],
                    ['compartments', 'order_id', 'ASC'],
                ],
            }),
    },
};

const countRoomById = ({ roomId }) => Room.count({ where: { roomId } });

module.exports = {
    findRoom,
    countRoomById,
};
