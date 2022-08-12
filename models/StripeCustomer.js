module.exports = (sequelize, DataTypes) => {
    const StripeCustomer = sequelize.define(
        'StripeCustomer',
        {
            customerId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'customer_id',
            },
            customerStripeId: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'customer_stripe_id',
                validate: { len: [0, 255] },
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'user_id',
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
            tableName: 'stripe_customers',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    StripeCustomer.attributes = {
        base: ['customerId', 'customerStripeId', 'userId', 'companyId'],
    };

    StripeCustomer.include = {
        base: (include = []) => {
            return {
                model: StripeCustomer,
                as: 'stripeCustomer',
                required: false,
                attributes: StripeCustomer.attributes.base,
                include,
            };
        },
    };

    StripeCustomer.associate = ({ User }) => {
        StripeCustomer.belongsTo(User, { foreignKey: 'userId', as: 'stripeCustomer' });
    };

    return StripeCustomer;
};
