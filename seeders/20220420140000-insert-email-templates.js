const tableName = 'email_templates';

const masterSubdomainId = 'cb639fe8-d5a7-43b8-b5cc-e6553ac0caaa';
const masterCompanyId = 'a8ebbc30-85db-448a-85a3-92fbe6a5dbdb';
const masterId = '87cfe8bc-511f-439c-881d-0a7395dba5a5';

const up = async (queryInterface) => {
    return queryInterface.bulkInsert(tableName, [
        {
            email_template_id: '0dd0474f-cdb3-415a-8ffd-048a45e6bad1',
            subject: 'Beginning of campaign',
            delivery_stage: 'Beginning of campaign',
            days_delay: null,
            template: '<p><span class="ql-shortcode" contenteditable="false">{{Invitation link}}</span>&nbsp;</p>',
            name: null,
            created_by: masterId,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            from: null,
            order_id: 1,
            is_enabled: false,
            parent_email_template_id: null,
            company_id: masterCompanyId,
            subdomain_id: masterSubdomainId,
        },
        {
            email_template_id: 'c443d690-f2bc-422d-8138-f6bd20988fb0',
            subject: '7 days after beginning of campaign',
            delivery_stage: 'days after beginning of campaign',
            days_delay: 7,
            template: '<p><span class="ql-shortcode" contenteditable="false">{{Invitation link}}</span>&nbsp;</p>',
            name: null,
            created_by: masterId,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            from: null,
            order_id: 2,
            is_enabled: false,
            parent_email_template_id: null,
            company_id: masterCompanyId,
            subdomain_id: masterSubdomainId,
        },
        {
            email_template_id: '818da960-4e39-43f8-8192-4e6fb32157ef',
            subject: '14 days after beginning of campaign',
            delivery_stage: 'days after beginning of campaign',
            days_delay: 14,
            template: '<p><span class="ql-shortcode" contenteditable="false">{{Invitation link}}</span>&nbsp;</p>',
            name: null,
            created_by: masterId,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            from: null,
            order_id: 3,
            is_enabled: false,
            parent_email_template_id: null,
            company_id: masterCompanyId,
            subdomain_id: masterSubdomainId,
        },
        {
            email_template_id: '7ab75263-953a-410e-9be5-c3737042fa0d',
            subject: '21 days after beginning of campaign',
            delivery_stage: 'days after beginning of campaign',
            days_delay: 21,
            template: '<p><span class="ql-shortcode" contenteditable="false">{{Invitation link}}</span>&nbsp;</p>',
            name: null,
            created_by: masterId,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            from: null,
            order_id: 4,
            is_enabled: false,
            parent_email_template_id: null,
            company_id: masterCompanyId,
            subdomain_id: masterSubdomainId,
        },
        {
            email_template_id: '7e98ff67-1f68-4b27-90f8-b9e2f628a843',
            subject: 'Thank you for your selection',
            delivery_stage: 'Thank you for your selection',
            days_delay: null,
            template: null,
            name: null,
            created_by: masterId,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            from: null,
            order_id: 5,
            is_enabled: false,
            parent_email_template_id: null,
            company_id: masterCompanyId,
            subdomain_id: masterSubdomainId,
        },
        {
            email_template_id: '21c04e3e-e3e1-49fe-b506-bf4dd40335fc',
            subject: 'End of campaign email',
            delivery_stage: 'End of campaign email',
            days_delay: null,
            template: null,
            name: null,
            created_by: masterId,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            from: null,
            order_id: 6,
            is_enabled: false,
            parent_email_template_id: null,
            company_id: masterCompanyId,
            subdomain_id: masterSubdomainId,
        },
    ]);
};

const down = (queryInterface) => {
    return queryInterface.bulkDelete(tableName, {
        email_template_id: [
            '0dd0474f-cdb3-415a-8ffd-048a45e6bad1',
            'c443d690-f2bc-422d-8138-f6bd20988fb0',
            '818da960-4e39-43f8-8192-4e6fb32157ef',
            '7ab75263-953a-410e-9be5-c3737042fa0d',
            '7e98ff67-1f68-4b27-90f8-b9e2f628a843',
            '21c04e3e-e3e1-49fe-b506-bf4dd40335fc',
        ],
    });
};

module.exports = {
    up,
    down,
};
