module.exports = (sequelize, DataTypes) => {
    const UnitsUsers = sequelize.define(
        'UnitsUsers',
        {
            unitId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'unit_id',
            },
            userId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'user_id',
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
            tableName: 'units_users',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    UnitsUsers.attributes = {
        base: ['unitId', 'userId'],
    };

    UnitsUsers.associate = ({}) => {};

    return UnitsUsers;
};
