module.exports = (sequelize, DataTypes) => {
    const ROOM_AREA = {
        COMMON: 'Common areas',
        BEDROOMS: 'Bedrooms',
        BASEMENT: 'Basement',
        OUTDOOR: 'Outdoor',
    };

    const Room = sequelize.define(
        'Room',
        {
            roomId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'room_id',
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'name',
                validate: { len: [0, 255] },
            },
            area: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'area',
                validate: { isIn: [Object.values(ROOM_AREA)] },
            },
            parentId: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'parent_id',
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                field: 'order_id',
            },
            createdBy: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'created_by',
            },
            updatedBy: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'updated_by',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'deleted_at',
            },
        },
        {
            tableName: 'rooms',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Room.attributes = {
        base: ['roomId', 'name', 'area', 'parentId', 'orderId'],
    };

    Room.include = {
        base: (include = []) => {
            return {
                model: Room,
                as: 'rooms',
                required: false,
                attributes: Room.attributes.base,
                include,
            };
        },
        rooms: () => {
            return {
                model: Room,
                as: 'rooms',
                required: false,
                attributes: Room.attributes.base,
                through: { attributes: [] },
            };
        },
    };

    Room.associate = ({ BuildingRoom, Buildings, Options }) => {
        Room.belongsTo(Room, {
            foreignKey: 'parentId',
            as: 'parent',
        });

        Room.hasMany(Room, {
            foreignKey: 'parentId',
            sourceKey: 'roomId',
            as: 'compartments',
        });

        Room.belongsToMany(Buildings, {
            through: BuildingRoom,
            foreignKey: 'roomId',
            as: 'rooms',
        });

        Room.hasMany(Options, {
            foreignKey: 'roomId',
            sourceKey: 'roomId',
            as: 'options',
        });
    };

    Room.AREA = ROOM_AREA;

    return Room;
};
