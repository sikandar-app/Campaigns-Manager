import { boot } from "quasar/wrappers";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

//const api_token = localStorage.token;

//if (api_token) {
//auth.login(api_token);
//}

var token = auth.token;
// var token = localStorage.token;

const api = axios.create({
  baseURL: process.env.API_URL + "/api/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    common: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
});

const pubApi = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    // Authorization: `Bearer ${token}`,
    common: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  app.config.globalProperties.$pubApi = pubApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, pubApi };
