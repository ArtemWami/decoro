module.exports = (sequelize, DataTypes) => {
    const UserBuilding = sequelize.define(
        'UserBuilding',
        {
            userId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'user_id',
            },
            buildingId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'building_id',
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
            tableName: 'users_buildings',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        },
    );

    UserBuilding.associate = ({}) => {};

    return UserBuilding;
};
