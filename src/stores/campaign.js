import { defineStore } from "pinia";

import axios from "axios";
import { useAuthStore } from "./auth";
import { useAgencyStore } from "./agency";
import { useLogStore } from "./log";
import { Loading } from "quasar";

const auth = useAuthStore();
const agency = useAgencyStore();
const log = useLogStore();

export const useCampaignStore = defineStore("campaign", {
  state: () => ({
    apiUrl: process.env.API_URL,
    campaign: {},
    campaigns: [],
    intialized: false,
  }),
  persist: false,
  getters: {
    getCampaign(state) {
      return state.campaign;
    },
    getCampaigns(state) {
      if (!this.intialized) {
        this.fetchCampaigns();
        this.intialized = true;
      }
      return state.campaigns;
    },
  },

  actions: {
    setCampaigns(campaigns) {
      this.campaigns = campaigns;
    },
    fetchCampaigns() {
      Loading.show();
      var token = auth.token;
      if (agency.agency && agency.agency.id > 0) {
        axios
          .get(this.apiUrl + "/api/campaigns/" + agency.agency.id, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            this.setCampaigns(response.data.data);
            Loading.hide();
          })
          .catch((err) => {
            Loading.hide();
          });
      }
      Loading.hide();
    },
    filterCampaigns(filters) {
      Loading.show();
      var token = auth.token;
      if (agency.agency.id > 0) {
        log.fetchLogs(
          agency.agency.id,
          filters.campaign,
          filters.program,
          filters.date_range
        );
        log.fetchMessageLogs(
          agency.agency.id,
          filters.campaign,
          filters.program,
          filters.date_range
        );
        axios
          .get(
            this.apiUrl +
              "/api/campaigns/" +
              agency.agency.id +
              "?program=" +
              filters.program +
              "&status=" +
              filters.status,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            this.setCampaigns(response.data.data);
            Loading.hide();
          })
          .catch((err) => {
            Loading.hide();
          });
      }
      Loading.hide();
    },
  },
});
