module.exports = (sequelize, DataTypes) => {
    const ModelRoom = sequelize.define(
        'ModelRoom',
        {
            modelId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'model_id',
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
            tableName: 'models_rooms',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        },
    );

    ModelRoom.associate = ({}) => {};

    return ModelRoom;
};
