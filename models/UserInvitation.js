module.exports = (sequelize, DataTypes) => {
    const UserInvitation = sequelize.define(
        'UserInvitation',
        {
            invitationId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'invitation_id',
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'email',
                validate: { len: [0, 255] },
            },
            key: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'key',
                validate: { len: [0, 255] },
            },
            verify: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
                field: 'verify',
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: true,
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
            tableName: 'user_invitations',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    UserInvitation.attributes = {
        base: ['invitationId', 'userId', 'email', 'key', 'verify', 'createdAt'],
    };

    UserInvitation.include = {
        base: (include = []) => {
            return {
                model: UserInvitation,
                as: 'UserInvitation',
                required: false,
                attributes: UserInvitation.attributes.base,
                include,
            };
        },
    };

    UserInvitation.associate = ({ User }) => {
        UserInvitation.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    };

    return UserInvitation;
};
