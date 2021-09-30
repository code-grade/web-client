import {USER_ROLES} from "../../store/static";

export const nav_item_types = {
    LINK: 'link',
    BUTTON: 'button',
    DIVIDER: 'divider'
}

const config = [
    {name: 'Dashboard', icon: 'mdi-view-dashboard', to: '/app'},
    {name: 'divider-1', type: nav_item_types.DIVIDER },

    {name: 'Users', icon: 'mdi-account-group', to: '/app/users', roles: [USER_ROLES.ADMIN]},

    {name: 'Questions', icon: 'mdi-comment-question', to: '/app/questions', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Create Question', icon: 'mdi-new-box', to: '/app/question/create', roles: [USER_ROLES.INSTRUCTOR]},
    //{name: 'Assignment', icon: 'mdi-comment-question', to: '/app/assignments', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Draft Assignments', icon: 'mdi-comment-question', to: '/app/assignments/DRAFT', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Publish Assignments', icon: 'mdi-comment-question', to: '/app/assignments/PUBLISHED', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'opened Assignments', icon: 'mdi-comment-question', to: '/app/assignments/OPEN', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'closed Assignments', icon: 'mdi-comment-question', to: '/app/assignments/CLOSED', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Finalized Assignments', icon: 'mdi-comment-question', to: '/app/assignments/FINALIZED', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Create Assignment', icon: 'mdi-new-box', to: '/app/assignments-create', roles: [USER_ROLES.INSTRUCTOR]},

    {name: 'Assignments', icon: 'mdi-new-box', to: '/app/student-assignments', roles: [USER_ROLES.STUDENT]},
    {name: 'Public Assignments', icon: 'mdi-new-box', to: '/app/public-assignments', roles: [USER_ROLES.STUDENT]},
]


export default config