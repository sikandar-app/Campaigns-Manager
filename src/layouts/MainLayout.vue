<template>
  <q-layout view="hHh lpR fFf" class="nv-layout">
    <q-header bordered class="nv-header text-white" height-hint="98">
      <q-toolbar class="">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="teal"
          class="nv-mobile-menu-toggle"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title shrink class="q-mr-md">
          <h5 class="text-h5 color-nevvon q-my-md" style="margin: auto">
            <img src="~assets/logo.png" style="" />
          </h5>
        </q-toolbar-title>

        <q-toolbar-title class="topNavigation">
          <div class="row justify-end">
            <AgencyPicker></AgencyPicker>
            <q-btn-dropdown
              v-model="account"
              class="text-white border-white-0 no-shadow custom-no-shadow q-px-sm"
              color=""
              :label="userLabel + ' &#10084;&#65039;'"
              icon="account_circle"
            >
              <q-list>
                <q-item clickable @click="logOut" v-close-popup>
                  <q-item-section avatar>
                    <q-avatar
                      icon="o_logout"
                      color="secondary"
                      text-color="white"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>LogOut</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
      side="left"
      :mini="false"
      :width="96"
      class="nv-sidebar"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import AgencyPicker from "src/components/AgencyPicker.vue";
import { Notify } from "quasar";
import { useAuthStore } from "../stores/auth";
import { useCampaignStore } from "../stores/campaign";
import { useAgencyStore } from "../stores/agency";
import { mapState, mapActions } from "pinia";

const auth = useAuthStore();
const campaign = useCampaignStore();
const agency = useAgencyStore();
var mainUrl = agency.getAgency.id ? "#/" + agency.getAgency.id + "/" : "#/";
// {
//     title: "Home",
//     caption: "Dashboard",
//     icon: "o_home",
//     nevvon_icon: "icon-home",
//     label: "Home",
//     link: mainUrl,
//   },
// {
//     title: "Templates",
//     caption: "Templates",
//     icon: "library_books",
//     //nevvon_icon: "icon-home",
//     label: "Templates",
//     link: mainUrl + "templates",
//   },
// {
//     title: "Settings",
//     caption: "Agency & Employees",
//     icon: "o_settings",
//     //nevvon_icon: "icon-settings",
//     link: "#",
//   },
const linksList = [
  {
    title: "Campaigns",
    caption: "Dashboard",
    icon: "o_campaign",
    //nevvon_icon: "icon-home",
    label: "Campaigns",
    link: mainUrl + "campaigns",
    name: "campaigns",
  },
  {
    title: "Logs",
    caption: "Logs",
    icon: "o_receipt_long",
    //nevvon_icon: "icon-home",
    label: "Logs",
    link: mainUrl + "logs",
    name: "campaign-logs",
  },
  {
    title: "Help",
    caption: "Help",
    icon: "o_help",
    //nevvon_icon: "icon-settings",
    link: "#",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    AgencyPicker,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      account: null,
    };
  },
  watch: {
    $route(to, from) {
      this.fetchAgencyIdOnUrl(to);
      campaign.fetchCampaigns();
    },
    agency(val) {
      campaign.fetchCampaigns();
    },
  },
  created() {
    campaign.fetchCampaigns();
    this.fetchAgencyIdOnUrl(this.$route);
  },
  computed: {
    ...mapState(useAgencyStore, ["agency", "agencies"]),
    userLabel() {
      return auth.user && auth.user.name ? auth.user.name : "Admin";
    },
  },
  methods: {
    ...mapActions(useAgencyStore, ["setAgency"]),
    fetchAgencyIdOnUrl(to) {
      var oldAgency = this.agency;
      if (to.params && to.params.agency_id) {
        var index = this.agencies.find(
          (agency) => agency.id == to.params.agency_id
        );
        if (index && index.id) {
          this.setAgency(index);
          if (!localStorage.isRefresh || to.params.agency_id != oldAgency.id) {
            window.location.reload();
            localStorage.isRefresh = 1;
          }
        } else {
          Notify.create({
            type: "negative",
            message: "Agency not found!",
          });
        }
      }
    },
    logOut() {
      this.$pubApi
        .post("/api/logout")
        .then(() => {
          auth.logout();

          Notify.create({
            type: "positive",
            message: "Successfully logout!",
          });
          this.$router.replace("/login");
        })
        .catch((err) => {
          Notify.create({
            type: "positive",
            message: "Could not logout!",
          });
          this.$router.replace("/login");
        });
    },
  },
});
</script>
