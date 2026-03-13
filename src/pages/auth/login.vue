<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-grey-50">
    <div class="w-112 flex flex-col bg-white border rounded-md p-8">
      <img src="../../assets/logo.svg" class="w-3/5" />
      <q-form
        @submit.prevent="login"
        class="flex flex-col"
        v-if="!forgotPasswordForm"
      >
        <input
          class="p-inputtext p-component !mt-6 !mt-6"
          placeholder="Email"
          autocomplete="email"
          v-model="formData.email"
          type="email"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <div
          class="p-password p-component p-inputwrapper mt-4 p-input-icon-right"
        >
          <input
            class="p-inputtext p-component p-password-input p-password-input"
            :type="passwordShow ? 'text' : 'password'"
            placeholder="Password"
            autocomplete="current-password"
            v-model="formData.password"
          />
          <q-icon
            :name="passwordShow ? 'visibility_off' : 'visibility'"
            @click="showPwd()"
          />
        </div>
        <div class="flex items-center justify-between pt-6">
          <div>
            <q-checkbox
              v-model="formData.remember"
              color="teal"
              label="Remember Me"
            />
          </div>
          <a href="javascript:void(0);" @click="forgotPassword()"
            >Forgot Password</a
          >
        </div>
        <div class="pt-8">
          <!-- <button class="p-button p-component !w-full" type="submit" id="login">
            <span class="p-button-label">Log In</span>
          </button> -->
          <button class="p-button p-component !w-full" id="login">
            <span class="p-button-label">Log In</span>
          </button>
        </div>
      </q-form>
      <q-form
        @submit="onSubmitForgetPassword"
        class="flex flex-col"
        v-else-if="forgotPasswordForm"
      >
        <input
          class="p-inputtext p-component !mt-6 !mt-6"
          placeholder="Email"
          autocomplete="email"
          v-model="form.email"
          type="email"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <div class="flex items-center justify-between pt-6">
          <div>
            <a
              href="javascript:void(0);"
              @click="loginReturn()"
              class="link-primary p-2 -mt-2 -mr-2 -mb-2"
              >Login</a
            >
          </div>
        </div>
        <div class="pt-8">
          <button class="p-button p-component !w-full" type="submit" id="login">
            <span class="p-button-label">Forget Password</span>
          </button>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { Notify } from "quasar";
import { useAuthStore } from "../../stores/auth";

const auth = useAuthStore();

export default {
  data() {
    return {
      apiUrl: process.env.API_URL,
      passwordShow: false,
      forgotPasswordForm: false,
      formData: {
        email: "",
        password: "",
        remember: false,
      },
      form: {
        email: "",
      },
    };
  },
  methods: {
    goToDashbaord() {
      this.$router.push({ name: "home" });
    },
    async onSubmitForgetPassword() {
      this.$loading.show();
      this.$api
        .post(this.apiUrl + "/api/forget-password", this.form)
        .then(
          function (res) {
            this.$loading.hide();
            Notify.create({
              type: "positive",
              message: "Reset Password Email sent.",
            });
          }.bind(this)
        )
        .catch((error) => {
          this.$loading.hide();
          Notify.create({
            type: "negative",
            message: "Please enter valid Information!",
          });
        });
    },
    login() {
      //this.$loading.show();
      this.$api.get(this.apiUrl + "/sanctum/csrf-cookie").then((response) => {
        this.$api
          .post(this.apiUrl + "/api/login", this.formData)
          .then((response) => {
            if (response.data.success) {
              var api_token = response.data.data.token;
              let user = response.data.data.user;
              auth.login(api_token);
              auth.setUser(user);

              // this.getUser(api_token)
              //   .then((response) => {
              //     auth.setUser(response);
              //   })
              //   .catch((err) => {});
              // this.goToDashbaord();
              this.$router.push({ name: "campaigns" });
            } else {
              Notify.create({
                type: "negative",
                message: "Invalid credentails. Please try again!",
              });
            }
          })
          .catch((err) => {
            //this.$loading.hide();
            console.log(err);
            Notify.create({
              type: "negative",
              message: "Please enter valid Information!",
            });
          });
      });
    },
    forgotPassword() {
      this.forgotPasswordForm = true;
    },
    loginReturn() {
      this.forgotPasswordForm = false;
    },
    async getUser(api_token) {
      return await this.$axios
        .get(this.apiUrl + "/api/user", {
          headers: { Authorization: `Bearer ${api_token}` },
        })
        .then((response) => {
          // set user details  response.data
          var user = response.data;
          return user;
        })
        .catch((err) => {
          console.log("getUser", err);
          return err;
        });
    },
    showPwd() {
      if (!this.passwordShow) {
        this.passwordShow = true;
      } else {
        this.passwordShow = false;
      }
    },
  },
};
</script>
<style scoped src="../../css/login.css"></style>
