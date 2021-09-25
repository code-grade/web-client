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
        path: '/about-us',
        name: 'AboutUs',
        component: () => import(/* webpackChunkName: "about" */ '../views/about-us')
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
            {
                path: 'users',
                name: 'Users',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/users')
            },
            {

                path: 'users/view',
                name: 'View Users',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/user-profile')
            },
{
                path: 'student-assignments',
                name: 'Student Assignment',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/student-assignments')
            },
            {
                path: 'view-assignment',
                name: 'View Assignment',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/view-assignment')
            },
            

        ]
    },
    {
        path: "*",
        component: () => import("../views/NotFound.vue")
    },
    {
        path: '/verify-email',
        component:()=>import("../views/emailVerification.vue")
    }
]

export default router_config