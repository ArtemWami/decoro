module.exports = (sequelize, DataTypes) => {
    const Options = sequelize.define(
        'Options',
        {
            optionsId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'options_id',
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'name',
                validate: { len: [0, 255] },
            },
            buildingId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'building_id',
            },
            roomId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'room_id',
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
            tableName: 'options',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Options.attributes = {
        base: ['optionsId', 'name', 'buildingId', 'roomId'],
    };

    Options.include = {
        base: (include = []) => {
            return {
                model: Options,
                as: 'options',
                required: false,
                attributes: Options.attributes.base,
                include,
            };
        },
    };

    Options.associate = ({ FinishType }) => {
        Options.hasMany(FinishType, {
            foreignKey: 'optionsId',
            sourceKey: 'optionsId',
            as: 'finishTypes',
        });
    };

    return Options;
};
