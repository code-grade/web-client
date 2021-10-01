import {USER_ROLES} from "@/store/static";

export const nav_item_types = {
    LINK: 'link',
    BUTTON: 'button',
    DIVIDER: 'divider'
}

const config = [
    {name: 'Dashboard', icon: 'mdi-view-dashboard', to: '/app'},
    {name: 'divider-1', type: nav_item_types.DIVIDER },

    // for admin
    {name: 'Users', icon: 'mdi-account-group', to: '/app/users', roles: [USER_ROLES.ADMIN]},

    // for instructor
    {name: 'Create Question', icon: 'mdi-new-box', to: '/app/question/create', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Question Bank', icon: 'mdi-comment-question', to: '/app/questions', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'divider-2', type: nav_item_types.DIVIDER, roles: [USER_ROLES.INSTRUCTOR] },
    {name: 'Create Assignment', icon: 'mdi-new-box', to: '/app/assignments-create', roles: [USER_ROLES.INSTRUCTOR]},
    //{name: 'Assignment', icon: 'mdi-comment-question', to: '/app/assignments', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Draft Assignments', icon: 'mdi-comment-question', to: '/app/assignments/DRAFT', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Publish Assignments', icon: 'mdi-comment-question', to: '/app/assignments/PUBLISHED', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Opened Assignments', icon: 'mdi-comment-question', to: '/app/assignments/OPEN', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Closed Assignments', icon: 'mdi-comment-question', to: '/app/assignments/CLOSED', roles: [USER_ROLES.INSTRUCTOR]},
    {name: 'Finalized Assignments', icon: 'mdi-comment-question', to: '/app/assignments/FINALIZED', roles: [USER_ROLES.INSTRUCTOR]},

    // for student
    //{name: 'Assignments', icon: 'mdi-new-box', to: '/app/student-assignments', roles: [USER_ROLES.STUDENT]},
    {name: 'Public Assignments', icon: 'mdi-new-box', to: '/app/public-assignments', roles: [USER_ROLES.STUDENT]},
    {name: 'Enrolled Assignments', icon: 'mdi-new-box', to: '/app/my-assignments/PUBLISHED', roles: [USER_ROLES.STUDENT]},
    {name: 'Ongoing Assignments', icon: 'mdi-new-box', to: '/app/my-assignments/OPEN', roles: [USER_ROLES.STUDENT]},
    {name: 'Closed Assignments', icon: 'mdi-new-box', to: '/app/my-assignments/CLOSED', roles: [USER_ROLES.STUDENT]},
    {name: 'Finalized Assignments', icon: 'mdi-new-box', to: '/app/my-assignments/FINALIZED', roles: [USER_ROLES.STUDENT]},
]


export default config