import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import App from '../views/app'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signIn',
        name: 'SignIn',
        component: () => import(/* webpackChunkName: "about" */ '../views/sign-in')
    },
    {
        path: '/app',
        name: 'App',
        component: App,
        children: [
            {
                path: '',
                name: 'Dashboard',
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

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
