module.exports = (sequelize, DataTypes) => {
    const BuildingRoom = sequelize.define(
        'BuildingRoom',
        {
            buildingId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'building_id',
            },
            roomId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'room_id',
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
            }
        },
        {
            tableName: 'buildings_rooms',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        },
    );

    BuildingRoom.associate = ({}) => {};

    return BuildingRoom;
};
