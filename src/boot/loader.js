import { boot } from "quasar/wrappers";
import { Loading } from "quasar";

export default boot(({ app }) => {
  app.config.globalProperties.$loading = Loading;
});
