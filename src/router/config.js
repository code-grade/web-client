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
            ,
            {
                path: 'assignments',
                name: 'Assignments',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/assignments')
            },


            {
                path: '/app/assignments-create',
                name: 'Create Assignment',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/create-assignment')
            },
            {
                path: 'assignments/:state',
                name: 'Assignments State',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/assignments')
            },
            {
                path: 'manageAssignment/:id',
                name: 'Manage Assignments',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/view-assignment-participants-instructor')
            },
            {
                path: 'assignments/:id/:stId',
                name: 'InstructorViewParticipantAttempts',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/view-participant-assignment-summary-instructor')
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
                path: 'view-assignment/:assignmentId',
                name: 'View Assignment',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/view-assignment')
            },
            {
                path: 'view-question',
                name: 'View Question',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/view-question')
            },
            {
                path: 'public-assignments',
                name: 'Public Assignments',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/public-assignments')
            },
            

        ]
    },
    {
        path: '/verify-email',
        name: 'VerifyEmail',
        component:()=>import("../views/emailVerification.vue")
    },
    {
        path: '/verify/:id',
        name: 'VerifyEmail',
        component:()=>import("../views/EmailVerifyStatus.vue")
    },

    {
        path: "*",
        component: () => import("../views/NotFound.vue")
    },

]

export default router_config