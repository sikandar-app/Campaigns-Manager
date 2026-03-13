import { LocalStorage } from "quasar";
import { useAuthStore } from "src/stores/auth";

const auth = useAuthStore();

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const isAuthorized = auth.isAuthorized;
    var guestRoutes = ["/login"];
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      // (!loggedIn || !token) &&
      !isAuthorized &&
      !guestRoutes.includes(to.path) &&
      to.name != "password_reset"
    ) {
      next("/login");
    } else {
      next();
    }
  });
};
