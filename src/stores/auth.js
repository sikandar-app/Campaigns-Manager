import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    token: "",
    user: null,
  }),
  persist: true,
  getters: {
    //isLoggedIn: (state) => state.isLoggedIn,
    getToken(state) {
      return state.token;
    },
    isAuthorized(state) {
      if (state.isLoggedIn == 1 && state.token != "") return true;
      if (localStorage.isLoggedIn == 1 && localStorage.token != "") return true;
      return false;
    },
  },

  actions: {
    login(token) {
      this.isLoggedIn = true;
      this.token = token;
      localStorage.token = token;
      localStorage.isLoggedIn = 1;
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.isLoggedIn = false;
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    },
  },
});
