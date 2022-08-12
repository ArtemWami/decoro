const groupCompartments = (rooms) => {
    const compartmentsByParent = {};
    const parents = rooms.reduce((acc, room) => {
        if (room.parentId) {
            if (!compartmentsByParent[room.parentId]) {
                compartmentsByParent[room.parentId] = [];
            }

            compartmentsByParent[room.parentId].push(room);
        } else {
            acc.push(room);
        }

        return acc;
    }, []);

    parents.forEach((parent) => {
        parent.compartments = compartmentsByParent[parent.roomId] || [];
    });

    return parents;
};

module.exports = groupCompartments;
