const tableName = 'companies';

const up = async (queryInterface) => {
    return queryInterface.bulkInsert(tableName, [
        {
            company_id: 'a8ebbc30-85db-448a-85a3-92fbe6a5dbdb',
            company_name: 'Master QA(DO NOT REMOVE)',
            email: 'master@qa.decoro.io',
            address: '',
            city: '',
            province: '',
            postal_code: '',
            country: 'Canada',
            phone: '',
            status: 'ACTIVE',
            primary_color: '9D2F92',
            text_color: '9D2F92',
            subdomain_id: 'cb639fe8-d5a7-43b8-b5cc-e6553ac0caaa',
            created_by: null,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
        {
            company_id: 'fe615b82-e266-489e-8ddb-bcf02b500a55',
            company_name: 'Account QA(DO NOT REMOVE)',
            email: 'admin@qa.decoro.io',
            address: '',
            city: '',
            province: '',
            postal_code: '',
            country: 'Canada',
            phone: '',
            status: 'ACTIVE',
            primary_color: '5856D6',
            text_color: 'FF2D55',
            subdomain_id: '3671f47c-24a2-4e6e-a743-32c4a8277755',
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
        company_id: [
            'a8ebbc30-85db-448a-85a3-92fbe6a5dbdb',
            'fe615b82-e266-489e-8ddb-bcf02b500a55',
        ],
    });
};

module.exports = {
    up,
    down,
};
