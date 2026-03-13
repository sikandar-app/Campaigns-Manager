import { defineStore } from "pinia";

import axios from "axios";
import { useAuthStore } from "./auth";
import { useLogStore } from "./log";

const auth = useAuthStore();
const log = useLogStore();

export const useAgencyStore = defineStore("agency", {
  state: () => ({
    apiUrl: process.env.API_URL,
    agency: {
      id: 0,
      code: "",
      name: "Select Agency",
    },
    agencies: [],
    recentAgencies: [],
    programs: [],
    intialized: false,
  }),
  persist: true,
  getters: {
    getAgency(state) {
      return state.agency;
    },
    getAgencies(state) {
      if (!this.intialized) {
        this.fetchAgencies();
        this.intialized = true;
      }
      return state.agencies;
    },
    getRecentAgencies(state) {
      this.fetchRecentAgencies();
      return state.agencies;
    },
    getPrograms(state) {
      return state.programs;
    },
  },

  actions: {
    setAgencies(agencies) {
      this.agencies = agencies;
    },
    setRecentAgencies(agencies) {
      this.recentAgencies = agencies;
    },
    setAgency(agency) {
      this.agency = agency;
      this.fetchPrograms();
    },
    fetchRecentAgencies() {
      var token = auth.token;
      axios
        .get(this.apiUrl + "/api/agencies/selected", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setRecentAgencies(response.data.data);
        })
        .catch((err) => {});
    },
    fetchAgencies() {
      //@todo api call to fetch agencies
      var token = auth.token;
      axios
        .get(this.apiUrl + "/api/agencies", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setAgencies(response.data.data);
        })
        .catch((err) => {});
    },
    setPrograms(programs) {
      this.programs = programs;
    },
    fetchPrograms() {
      //@todo api call to fetch agencies
      if (this.agency && this.agency.id > 0) {
        log.fetchLogs(this.agency.id);
        log.fetchMessageLogs(this.agency.id);
        var token = auth.token;
        axios
          .get(this.apiUrl + "/api/agencies/" + this.agency.id + "/courses", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            this.setPrograms(response.data.data);
          })
          .catch((err) => {});
      } else {
        this.setPrograms([]);
      }
    },
  },
});
