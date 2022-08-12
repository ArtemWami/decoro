module.exports = (sequelize, DataTypes) => {
    const Subdomain = sequelize.define(
        'Subdomain',
        {
            subdomainId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'subdomain_id',
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'name',
                unique: true,
                validate: { len: [0, 255] },
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
            tableName: 'subdomains',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Subdomain.attributes = {
        base: ['subdomainId', 'name'],
    };

    Subdomain.include = {
        base: (include = [], attributes) => {
            return {
                model: Subdomain,
                as: 'subdomain',
                required: false,
                attributes: attributes || Subdomain.attributes.base,
                include,
            };
        },
    };

    Subdomain.associate = ({}) => {};

    return Subdomain;
};
