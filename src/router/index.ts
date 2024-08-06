import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";
import Report from "../views/report/Index.vue";
import Excel from "../views/excel/Index.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "report",
        component: Report,
        meta: {
            title: "报表",
        },
    },
    {
        path: "/excel",
        name: "excel",
        component: Excel,
        meta: {
            title: "Excel",
        },
    },
];

const router = createRouter({
    linkActiveClass: "",
    linkExactActiveClass: "link-exact-active",
    history: createWebHashHistory(),
    routes,
});

export default router;
