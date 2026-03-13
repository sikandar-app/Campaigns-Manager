const routes = [
  {
    path: "/:agency_id?",
    component: () => import("layouts/MainLayout.vue"),
    name: "main",
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/Home/Index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "campaigns",
        name: "campaigns",
        component: () => import("pages/Campaigns/Index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "campaign/edit/:id",
        name: "campaign.edit",
        component: () => import("pages/Campaigns/Edit.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "templates/create",
        name: "template.create",
        component: () => import("pages/Templates/Create.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "templates",
        name: "templates",
        component: () => import("pages/Templates/Index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "logs",
        name: "campaign-logs",
        component: () => import("pages/Logs/Index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "messages/logs",
        name: "messages-logs",
        component: () => import("pages/Logs/Index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/EmptyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/auth/login.vue"),
        name: "login",
      },
    ],
  },
  {
    path: "/agency/",
    component: () => import("layouts/MainLayout.vue"),
    children: [],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
