const viewName = 'images_view';
const viewSql = `
CREATE OR REPLACE VIEW public.${viewName} AS
    (
        SELECT
            image_id,
            type,
            key,
            location,
            size,
            NULL as building_id,
            company_id,
            subdomain_id,
            created_by,
            created_at
        FROM
            company_images
    )
    UNION
    (
        SELECT
            image_id,
            type,
            key,
            location,
            size,
            building_id,
            company_id,
            subdomain_id,
            created_by,
            created_at
        FROM
            building_images
    )
    UNION
    (
        SELECT
            image_id,
            type,
            key,
            location,
            size,
            building_id,
            company_id,
            subdomain_id,
            created_by,
            created_at
        FROM
            model_images
    )
    UNION
    (
        SELECT
            image_id,
            type,
            key,
            location,
            size,
            building_id,
            company_id,
            subdomain_id,
            created_by,
            created_at
        FROM
            palette_location_images
    )
    UNION
    (
        SELECT
            image_id,
            type,
            key,
            location,
            size,
            building_id,
            company_id,
            subdomain_id,
            created_by,
            created_at
        FROM
            finish_types_palettes_images
    )
`;

const up = (queryInterface) => {
    return queryInterface.sequelize.query(viewSql);
};

const down = (queryInterface) => {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
};

module.exports = {
    up,
    down,
};
