export const routes1 = [
    {
        path: "/demo",
        name: "demo",
        component: "Index",
        meta: {
            title: "Demo",
        },
        redirect: "/demo1",
        children: [
            {
                path: "/demo1",
                name: "demo1",
                component: "Demo1",
                meta: {
                    title: "Demo1",
                },
            },
        ],
    },
    {
        path: "/demo2",
        name: "Demo2",
        component: "Demo2",
        meta: {
            title: "Demo2",
        },
    },
];
