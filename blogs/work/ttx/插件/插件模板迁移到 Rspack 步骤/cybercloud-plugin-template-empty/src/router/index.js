import Home from "@/views/index.vue";

export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/launch",
    component: () => import("@/views/launch/index.vue"),
  },
  {
    path: "/examples",
    component: () => import("@/views/examples/index.vue"),
    children: [
      {
        path: "buttons",
        component: () => import("@/views/examples/buttons/index.vue"),
      },
      {
        path: "env",
        component: () => import("@/views/examples/env/index.vue"),
      },
    ],
  },
];
