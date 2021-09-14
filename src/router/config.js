import Home from "../views/home";
import App from "../views/app";


export const router_config = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/sign-in')
    },
    {
        path: '/app',
        component: App,
        children: [
            {
                path: '',
                name: 'App',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/dashboard')
            },
            {
                path: 'questions',
                name: 'Questions',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/questions')
            },
            {
                path: 'question/create',
                name: 'Create Question',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/create-question')
            },
        ]
    }
]

export default router_config