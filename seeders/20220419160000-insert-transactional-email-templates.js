const fs = require('fs');
const path = require('path');
const { sanitize } = require('../src/helpers/templates');

const adminInvitationTemplate = fs.readFileSync(
    path.join(__dirname, '../templates/admin-invitation.html'),
    'utf-8'
);

const changeEmailCancelStep1 = fs.readFileSync(
    path.join(__dirname, '../templates/change-email-cancel-step-1.html'),
    'utf-8'
);

const changeEmailCancelStep2 = fs.readFileSync(
    path.join(__dirname, '../templates/change-email-cancel-step-2.html'),
    'utf-8'
);

const changeEmailConfirmationStep1 = fs.readFileSync(
    path.join(__dirname, '../templates/change-email-confirmation-step-1.html'),
    'utf-8'
);

const changeEmailConfirmationStep2 = fs.readFileSync(
    path.join(__dirname, '../templates/change-email-confirmation-step-2.html'),
    'utf-8'
);

const forgotPassword = fs.readFileSync(
    path.join(__dirname, '../templates/forgot-password.html'),
    'utf-8'
);

const teamMemberInvitation = fs.readFileSync(
    path.join(__dirname, '../templates/team-member-invitation.html'),
    'utf-8'
);

const tableName = 'transactional_email_templates';

const up = async (queryInterface) => {
    return queryInterface.bulkInsert(tableName, [
        {
            transactional_email_template_id: '3bfdf5e5-9e15-4166-b6e3-70c23f1337da',
            type: 'ADMIN_INVITATION',
            description: 'Admin invitation',
            subject: 'WELCOME TO DECORO',
            text: sanitize(adminInvitationTemplate),
            html: adminInvitationTemplate,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
        {
            transactional_email_template_id: 'e331fd0d-d083-41e8-80f8-e9f39db8e3e6',
            type: 'CHANGE_EMAIL_CANCEL_STEP_1',
            description: 'Change email cancel step 1',
            subject: 'Email Change Request',
            text: sanitize(changeEmailCancelStep1),
            html: changeEmailCancelStep1,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
        {
            transactional_email_template_id: '821dce1a-b65e-4c22-b929-29d3d40b8d5b',
            type: 'CHANGE_EMAIL_CANCEL_STEP_2',
            description: 'Change email cancel step 2',
            subject: 'Email Change Notification',
            text: sanitize(changeEmailCancelStep2),
            html: changeEmailCancelStep2,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
        {
            transactional_email_template_id: '06c030cb-3692-45d2-9b73-61bfdd454f32',
            type: 'CHANGE_EMAIL_CONFIRMATION_STEP_1',
            description: 'Change email confirmation step 1',
            subject: 'Email Change Verification',
            text: sanitize(changeEmailConfirmationStep1),
            html: changeEmailConfirmationStep1,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
        {
            transactional_email_template_id: '75069975-128d-47a8-883a-8f0449684f21',
            type: 'CHANGE_EMAIL_CONFIRMATION_STEP_2',
            description: 'Change email confirmation step 2',
            subject: 'Email Change Notification',
            text: sanitize(changeEmailConfirmationStep2),
            html: changeEmailConfirmationStep2,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
        {
            transactional_email_template_id: '228294de-614d-40ae-b0e0-6a1fede237d2',
            type: 'FORGOT_PASSWORD',
            description: 'Forgot password',
            subject: 'FORGOT PASSWORD',
            text: sanitize(forgotPassword),
            html: forgotPassword,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
        {
            transactional_email_template_id: '7daeb3a8-7d65-4c19-a3a1-08be14e81646',
            type: 'TEAM_MEMBER_INVITATION',
            description: 'Team member invitation',
            subject: 'WELCOME TO DECORO',
            text: sanitize(teamMemberInvitation),
            html: teamMemberInvitation,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        },
    ]);
};

const down = (queryInterface) => {
    return queryInterface.bulkDelete(tableName, {
        transactional_email_template_id: [
            '3bfdf5e5-9e15-4166-b6e3-70c23f1337da',
            'e331fd0d-d083-41e8-80f8-e9f39db8e3e6',
            '821dce1a-b65e-4c22-b929-29d3d40b8d5b',
            '06c030cb-3692-45d2-9b73-61bfdd454f32',
            '75069975-128d-47a8-883a-8f0449684f21',
            '228294de-614d-40ae-b0e0-6a1fede237d2',
            '7daeb3a8-7d65-4c19-a3a1-08be14e81646',
        ],
    });
};

module.exports = {
    up,
    down,
};
