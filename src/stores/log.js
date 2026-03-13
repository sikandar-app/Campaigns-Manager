import { defineStore } from "pinia";

import axios from "axios";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useLogStore = defineStore("log", {
  state: () => ({
    apiUrl: process.env.API_URL,
    logs: [],
    messageLogs: [],
    intialized: false,
    intializedMsg: false,
  }),
  persist: true,
  getters: {
    getLogs(state) {
      if (!this.intialized) {
        this.fetchLogs();
        this.intialized = true;
      }
      return state.logs;
    },
    getMessageLogs(state) {
      if (!this.intializedMsg) {
        this.fetchMessageLogs();
        this.intializedMsg = true;
      }
      return state.messageLogs;
    },
  },

  actions: {
    setLogs(logs) {
      this.logs = logs;
    },
    setMessageLogs(messageLogs) {
      this.messageLogs = messageLogs;
    },
    fetchLogs(agencyId = null, campaign = [], program = [], dateRange = null) {
      var token = auth.token;
      var url = "/api/logs/";
      if (agencyId) {
        url = url + agencyId;
      }
      url =
        url +
        "?campaign=" +
        campaign +
        "&program=" +
        program +
        "&date_range=" +
        dateRange;
      axios
        .get(this.apiUrl + url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setLogs(response.data.data);
        })
        .catch((err) => {});
    },
    fetchMessageLogs(
      agencyId = null,
      campaign = [],
      program = [],
      dateRange = null
    ) {
      var token = auth.token;
      var url = "/api/messages/logs/";
      if (agencyId) {
        url = url + agencyId;
      }
      url =
        url +
        "?campaign=" +
        campaign +
        "&program=" +
        program +
        "&date_range=" +
        dateRange;

      axios
        .get(this.apiUrl + url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setMessageLogs(response.data.data);
        })
        .catch((err) => {});
    },
  },
});
