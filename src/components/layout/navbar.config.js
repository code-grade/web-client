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
    {name: 'Create', icon: 'mdi-new-box', to: '/app/question/create', roles: [USER_ROLES.INSTRUCTOR]},
]


export default config