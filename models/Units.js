const { priceFieldAccessors } = require('../src/helpers/model');

module.exports = (sequelize, DataTypes) => {
    const UNIT_TYPE = {
        LOWER_LEVEL_UNITS: 'LOWER_LEVEL_UNITS',
        LOWER_PENTHOUSES: 'LOWER_PENTHOUSES',
        UPPER_PENTHOUSES: 'UPPER_PENTHOUSES',
        TOWNHOUSES: 'TOWNHOUSES',
    };

    const Units = sequelize.define(
        'Units',
        {
            unitId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'unit_id',
            },
            modelId: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'model_id',
            },
            unitNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'unit_number',
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'status',
                validate: { len: [0, 255] },
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'type',
                validate: { isIn: [Object.values(UNIT_TYPE)] },
            },
            cash: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                field: 'cash',
                ...priceFieldAccessors('cash'),
            },
            recipientId: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'recipient_id',
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
            tableName: 'units',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Units.attributes = {
        base: [
            'unitId',
            'unitNumber',
            'status',
            'modelId',
            'buildingId',
            'recipientId',
            'type',
            'cash',
        ],
    };

    Units.include = {
        base: (include = []) => {
            return {
                model: Units,
                as: 'units',
                required: false,
                attributes: Units.attributes.base,
                include,
            };
        },
    };

    Units.TYPE = UNIT_TYPE;
    Units.TYPES = Object.values(UNIT_TYPE);

    Units.STATUS = {
        NEVER_LOGGED_IN: 'NEVER_LOGGED_IN',
    };

    Units.STATUES = Object.values(Units.STATUS);

    Units.associate = ({
        Buildings,
        User,
        UnitsUsers,
        Description,
        Model,
        EmailTemplate,
        EmailTemplateLog,
    }) => {
        Units.belongsTo(Buildings, { foreignKey: 'buildingId', as: 'building' });
        Units.belongsTo(Model, { foreignKey: 'modelId', as: 'model' });
        Units.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });
        Units.belongsToMany(User, {
            through: UnitsUsers,
            foreignKey: 'unitId',
            as: 'users',
        });
        Units.hasMany(Description, { foreignKey: 'unitId', as: 'description' });
        Units.belongsToMany(EmailTemplate, {
            through: EmailTemplateLog,
            foreignKey: 'unitId',
            otherKey: 'emailTemplateId',
            as: 'emailTemplates',
        });
    };

    return Units;
};
