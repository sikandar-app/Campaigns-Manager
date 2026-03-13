<template>
  <q-select
    v-if="agency.id && isCampaignShow"
    class="q-mr-sm text-h6 filter-design"
    dense
    rounded
    standout="bg-teal text-white"
    v-model="campaign"
    :options="campaigns"
    multiple
    map-options
    :lazy-rules="true"
    :options-dense="true"
    input-debounce="0"
    @filter="filterFnCampaigns"
    :display-value="'All Campaigns'"
  >
    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
      <q-item v-bind="itemProps">
        <q-item-section side>
          <q-checkbox
            :model-value="selected"
            @update:model-value="toggleOption(opt)"
          />
        </q-item-section>
        <q-item-section>
          {{ opt.name }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
  <q-select
    v-if="isStatusShow && agency.id"
    dense
    rounded
    standout="bg-teal text-white"
    v-model="status"
    option-value="id"
    option-label="name"
    :options="statusOptions"
    class="q-mr-sm text-h6 filter-design"
    map-options
    :lazy-rules="true"
    :options-dense="true"
    input-debounce="0"
    :display-value="status && status.name ? status.name : 'All Statuses'"
    clearable
    @clear="statusClearEvent()"
  >
    <!-- <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
      <q-item v-bind="itemProps">
        <q-item-section side>
          <q-checkbox
            :model-value="selected"
            @update:model-value="toggleOption(opt)"
          />
        </q-item-section>
        <q-item-section>
          {{ opt.name }}
        </q-item-section>
      </q-item>
    </template> -->
  </q-select>
  <q-input
    v-if="agency.id && isLogDateShow"
    class="q-mr-sm text-h6 q-pb-none filter-design"
    standout="bg-teal text-white"
    dense
    rounded
    :model-value="`${dateRange.from} : ${dateRange.to}`"
    clearable
    @clear="dateClearEvent()"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="dateRange" mask="YYYY-MM-DD" range>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
  <q-select
    v-if="!agency.id"
    class="q-mr-sm text-h6 filter-design"
    dense
    rounded
    standout="bg-teal text-white"
    v-model="selectedAgency"
    :options="agenciesOptions"
    map-options
    :lazy-rules="true"
    :options-dense="true"
    input-debounce="0"
    @filter="filterAgencies"
    use-input
    option-value="id"
    option-label="name"
    placeholder="All Agencies"
  >
  </q-select>
</template>

<script>
import { ref } from "vue";
import { useAgencyStore } from "../stores/agency";
import { useCampaignStore } from "../stores/campaign";
import { useLogStore } from "../stores/log";
import { mapState, mapActions } from "pinia";
import { emitter } from "../boot/bus";

export default {
  props: {
    isStatusShow: {
      type: Boolean,
      default: true,
    },
    isCampaignShow: {
      type: Boolean,
      default: false,
    },
    isLogDateShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      campaign: ref([]),
      campaigns: ref([]),
      program: ref([]),
      filters: {
        campaigns: ref([]),
        dateRange: ref({ to: "", from: "" }),
        status: null,
      },
      selectedAgency: null,
      agenciesOptions: this.agencies,
      status: ref(null),
      statusOptions: [
        { id: "in-progress", name: "In Progress" },
        { id: "completed", name: "Completed" },
        { id: "failed", name: "Failed" },
      ],
      dateRange: ref({ to: "", from: "" }),
    };
  },
  watch: {
    $route(to, from) {
      this.setFilterCampaign();
    },
    dateRange(val) {
      this.filters.dateRange.from = val.from;
      this.filters.dateRange.to = val.to;
      this.filterLogs(this.filters);
    },
    campaign(val) {
      let campaignIds = [];
      this.campaign.forEach((campaign) => {
        campaignIds.push(campaign.id);
      });
      this.filters.campaigns = campaignIds;
      this.filterLogs(this.filters);
    },
    status(val) {
      this.filters.status = val && val.id ? val.id : null;
      this.filterLogs(this.filters);
    },
    selectedAgency(val) {
      var agency = this.agency;
      this.setAgency(val);
      if (agency.id != val.id) {
        this.$router
          .push({
            name: this.$router.currentRoute.name,
            params: { agency_id: val.id },
          })
          .then(() => {
            this.$router.go();
          });
      }
    },
  },
  computed: {
    ...mapState(useAgencyStore, ["getPrograms", "agency", "agencies"]),
    ...mapState(useCampaignStore, ["getCampaigns"]),
    ...mapState(useLogStore, ["getLogs", "logs"]),
    campaignOptions() {
      let campaigns = [];
      this.getCampaigns.forEach((campaign) => {
        campaigns.push({ id: campaign.id, name: campaign.title });
      });
      return campaigns;
    },
  },
  mounted() {
    let logId = this.$route.query.q;
    if (logId) {
      this.setFilterValues(this.getLogById(this.$route.query.q), false);
    } else {
      this.setFilterCampaign();
    }
  },
  methods: {
    ...mapActions(useAgencyStore, ["setAgency"]),
    statusClearEvent() {
      this.status = null;
    },
    dateClearEvent() {
      this.dateRange.from = "";
      this.dateRange.to = "";
      this.filters.dateRange.from = "";
      this.filters.dateRange.to = "";
      this.filterLogs(this.filters);
    },
    filterLogs(val) {
      emitter.emit("filter-log-event", val);
    },
    getLogById(id) {
      return this.getLogs.filter((v) => v.campaign_id == id);
    },
    filterAgencies(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.agenciesOptions = this.agencies.filter(
          (v) => v.name.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },
    setFilterCampaign() {
      this.dateRange.from = "";
      this.dateRange.to = "";
      this.status = null;
      this.getLogs.forEach((log) => {
        this.campaign.push({
          id: log.campaign_id,
          name: log.campaign.title,
        });
      });
      emitter.emit("restore-log-event");
    },
    setFilterValues(logObj, isDateCheck = true) {
      if (logObj && logObj[0]) {
        let campLog = logObj[0];
        this.campaign.push({
          id: campLog.campaign_id,
          name: campLog.campaign.title,
        });
        this.filters.campaigns = [campLog.campaign_id];
        if (isDateCheck) {
          this.filters.dateRange.from = campLog.run_date;
          this.filters.dateRange.to = campLog.run_date;
          this.dateRange.from = campLog.run_date;
          this.dateRange.to = campLog.run_date;
        }
        this.filterLogs(this.filters);
      }
    },
    filterFnCampaigns(val, update) {
      if (val === "") {
        update(() => {
          this.campaigns = this.campaignOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.campaigns = this.campaignOptions.filter(
          (v) => v.name.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
};
</script>
