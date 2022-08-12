const tableName = 'subdomains';

const up = async (queryInterface) => {
    return queryInterface.bulkInsert(tableName, [
        {
            subdomain_id: 'cb639fe8-d5a7-43b8-b5cc-e6553ac0caaa',
            name: 'master-qa',
            created_by: null,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
        {
            subdomain_id: '3671f47c-24a2-4e6e-a743-32c4a8277755',
            name: 'account-qa',
            created_by: null,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
    ]);
};

const down = (queryInterface) => {
    return queryInterface.bulkDelete(tableName, {
        subdomain_id: [
            'cb639fe8-d5a7-43b8-b5cc-e6553ac0caaa',
            '3671f47c-24a2-4e6e-a743-32c4a8277755',
        ],
    });
};

module.exports = {
    up,
    down,
};
