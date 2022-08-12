module.exports = (sequelize, DataTypes) => {
    const FinishType = sequelize.define(
        'FinishType',
        {
            finishTypeId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'finish_type_id',
            },
            optionsId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'options_id',
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'name',
                validate: { len: [0, 255] },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'description',
                validate: { len: [0, 500] },
            },
            buildingId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'building_id',
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'company_id',
            },
            subdomainId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'subdomain_id',
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
            tableName: 'finish_types',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    FinishType.attributes = {};

    FinishType.associate = ({ FinishTypePalette, Price }) => {
        FinishType.hasMany(FinishTypePalette, {
            foreignKey: 'finishTypeId',
            sourceKey: 'finishTypeId',
            as: 'finishTypePalettes',
        });

        FinishType.hasMany(Price, {
            foreignKey: 'finishTypeId',
            sourceKey: 'finishTypeId',
            as: 'prices',
        });
    };

    return FinishType;
};
