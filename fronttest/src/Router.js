import {createRouter, createWebHistory} from 'vue-router';

import about from './components/about';
import worker from './components/worker.vue';
import workerDetails from './components/workerDetails';
import fullScreenEditWorder from './components/fullScreenEditWorder';
import fullScreenNewWorder from "./components/fullScreenNewWorker.vue";
import SignIn from "./components/FullScreenSignIn";
import axios from "axios";

const Router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/about',
            component: about
        },
        {
            path: '/',
            component: worker
        },
        {
            path: "/worker/:id",
            component: workerDetails,
            props: true
        },
        {
            path: '/worker/:id/edit',
            component: fullScreenEditWorder,
            props: true
        },
        {
            path:"/worker/new",
            component: fullScreenNewWorder
        },
        {
            path:"/signin",
            component: SignIn
        }
]
});
Router.beforeEach(async (to, from, next) => {
    if (to.meta && to.meta.needAuthentification){
        try{
            const token = localStorage.getItem("token");
            await axios.get("https://localhost:3443/auth",
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            next();
        } catch (error){
            next("/signin")
        }
    }
    else
        next();
});

export default Router;