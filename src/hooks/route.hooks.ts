import router from "../router";

export const useAddRoute = () => {
    // const router = useRouter();

    // 动态路由添加
    function addRoutes(routes: any) {
        routes.forEach((item: any) => {
            router.addRoute({
                ...item,
                component: () =>
                    import(`../views/route-demo/${item.component}.vue`),
            });
        });

        console.log(router.options.routes, "=-=-=-=-=-=-=-=");
        console.log(router.getRoutes(), "--itemlist");
    }

    return {
        addRoutes,
    };
};
