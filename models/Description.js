module.exports = (sequelize, DataTypes) => {
    const Description = sequelize.define(
        'Description',
        {
            descriptionId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'description_id',
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'text',
                validate: { len: [0, 255] },
            },
            unitId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'unit_id',
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
            tableName: 'descriptions',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Description.attributes = {
        base: ['descriptionId', 'text', 'unitId', 'createdBy'],
    };

    Description.include = {
        base: (include = []) => {
            return {
                model: Description,
                as: 'description',
                required: false,
                attributes: Description.attributes.base,
                include,
            };
        },
    };

    Description.associate = ({}) => {};

    return Description;
};
