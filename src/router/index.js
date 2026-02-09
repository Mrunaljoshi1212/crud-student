import { createRouter, createWebHistory } from 'vue-router'
// import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import StudentView from '@/views/Students/view.vue'
import studentsCreate from '@/views/Students/create.vue'
import StudentEdit from '@/views/Students/edit.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // component: AboutViewView
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/students',
            name: 'students',
            component: StudentView
        },
        {
            path: '/students/create',
            name: 'studentsCreate',
            component: studentsCreate
        },
        {
            path: '/students/:id/edit',
            name: 'studentsEdit',
            component: StudentEdit,
            props: true
        }

    ]
})


export default router
