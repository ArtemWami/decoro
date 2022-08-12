module.exports = (sequelize, DataTypes) => {
    const STATUS = {
        DRAFT: 'DRAFT',
        IN_PROGRESS: 'IN PROGRESS',
        COMPLETED: 'COMPLETED',
    };

    const Buildings = sequelize.define(
        'Buildings',
        {
            buildingId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'building_id',
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'name',
                validate: { len: [0, 255] },
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'address',
                validate: { len: [0, 255] },
            },
            city: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'city',
                validate: { len: [0, 255] },
            },
            province: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'province',
                validate: { len: [0, 255] },
            },
            postalCode: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'postal_code',
                validate: { len: [0, 255] },
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'status',
                validate: { isIn: [Object.values(STATUS)] },
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
            campaignStartedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'campaign_started_at',
            },
            campaignEndedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'campaign_ended_at',
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
            tableName: 'buildings',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Buildings.attributes = {
        base: ['buildingId', 'name', 'address', 'city', 'province', 'postalCode', 'status'],
    };

    Buildings.include = {
        base: (include = []) => {
            return {
                model: Buildings,
                as: 'building',
                required: false,
                attributes: Buildings.attributes.base,
                include,
            };
        },
    };

    Buildings.associate = ({
        BuildingImage,
        User,
        UserBuilding,
        Units,
        Model,
        Palette,
        Room,
        BuildingRoom,
        Subdomain,
    }) => {
        Buildings.belongsTo(Subdomain, { foreignKey: 'subdomainId', as: 'subdomain' });
        Buildings.hasMany(BuildingImage, {
            foreignKey: 'buildingId',
            sourceKey: 'buildingId',
            as: 'images',
        });

        Buildings.hasMany(Units, {
            foreignKey: 'buildingId',
            sourceKey: 'buildingId',
            as: 'units',
        });

        Buildings.belongsToMany(User, {
            through: UserBuilding,
            foreignKey: 'buildingId',
            as: 'user',
        });

        Buildings.hasMany(Model, {
            foreignKey: 'buildingId',
            sourceKey: 'buildingId',
            as: 'models',
        });

        Buildings.belongsToMany(Room, {
            through: BuildingRoom,
            foreignKey: 'buildingId',
            as: 'rooms',
        });

        Buildings.hasMany(Palette, {
            foreignKey: 'buildingId',
            sourceKey: 'buildingId',
            as: 'palette',
        });

        Buildings.addScope('withImages', {
            include: [
                {
                    model: BuildingImage,
                    as: 'images',
                    order: [['imageId', 'DESC']],
                    attributes: BuildingImage.attributes.base,
                },
            ],
        });

        Buildings.addScope('withUser', {
            include: [
                {
                    model: User,
                    through: { attributes: [] },
                    as: 'user',
                    attributes: ['userId', 'firstName', 'lastName'],
                    order: [['userId', 'desc']],
                },
            ],
        });
    };

    Buildings.STATUS = STATUS;
    Buildings.STATUSES = Object.values(STATUS);

    return Buildings;
};
