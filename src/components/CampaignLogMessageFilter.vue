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
  <!-- <q-select
    v-if="agency.id"
    class="q-mr-sm text-h6"
    dense
    outlined
    no-bordered
    v-model="program"
    :options="programOptions"
    multiple
    map-options
    :lazy-rules="true"
    :options-dense="true"
    input-debounce="0"
    :display-value="'Programs'"
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
  </q-select> -->
  <q-input
    v-if="agency.id && isLogDateShow"
    class="q-pb-none filter-design"
    dense
    rounded
    standout="bg-teal text-white"
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
        programs: ref([]),
        dateRange: ref({ to: "", from: "" }),
      },
      selectedAgency: null,
      agenciesOptions: this.agencies,
      dateRange: ref({ to: "", from: "" }),
    };
  },
  watch: {
    dateRange(val) {
      this.filters.dateRange.from = val.from;
      this.filters.dateRange.to = val.to;
      this.filterLogMessage(this.filters);
    },
    campaign(val) {
      let campaignIds = [];
      this.campaign.forEach((campaign) => {
        campaignIds.push(campaign.id);
      });
      this.filters.campaigns = campaignIds;
      this.filterLogMessage(this.filters);
    },
    program(val) {
      let programIds = [];
      this.program.forEach((program) => {
        programIds.push(program.id);
      });
      this.filters.programs = programIds;
      this.filterLogMessage(this.filters);
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
    programOptions() {
      let programs = [];
      this.getPrograms.forEach((program) => {
        programs.push({ id: program.id, name: program.name });
      });
      return programs;
    },
  },
  mounted() {
    let logId = this.$route.query.q;
    let campaignId = this.$route.query.campaign_id;
    if (logId) {
      this.setFilterValues(this.getLogById(logId));
    } else if (campaignId) {
      this.setFilterValues(this.getLogByCampaignId(campaignId), false);
    } else {
      this.setFilterCampaign();
    }
  },
  methods: {
    ...mapActions(useAgencyStore, ["setAgency"]),
    dateClearEvent() {
      this.dateRange.from = "";
      this.dateRange.to = "";
      this.filters.dateRange.from = "";
      this.filters.dateRange.to = "";
      this.filterLogMessage(this.filters);
    },
    filterLogMessage(val) {
      emitter.emit("filter-message-log-event", val);
    },
    getLogById(id) {
      return this.getLogs.filter((v) => v.id == id);
    },
    getLogByCampaignId(campaignId) {
      return this.getLogs.filter((v) => v.campaign_id == campaignId);
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
      this.getLogs.forEach((log) => {
        this.campaign.push({
          id: log.campaign_id,
          name: log.campaign.title,
        });
      });
    },
    setFilterValues(logObj, isDateCheck = true) {
      if (logObj && logObj[0]) {
        let campLog = logObj[0];
        this.campaign.push({
          id: campLog.campaign_id,
          name: campLog.campaign.title,
        });
        this.filters.campaigns = [campLog.campaign_id];
        // let programIds = [];
        // campLog.campaign.programs.forEach((program) => {
        //   let isExists = this.program.some((prog) => {
        //     if (prog.id == program.program_id) {
        //       return true;
        //     }
        //     return false;
        //   });
        //   if (!isExists) {
        //     programIds.push(program.program_id);
        //     this.program.push({
        //       id: program.program_id,
        //       name: program.program_name,
        //     });
        //   }
        // });

        // this.filters.programs = programIds;
        if (isDateCheck) {
          this.filters.dateRange.from = campLog.run_date;
          this.filters.dateRange.to = campLog.run_date;
          this.dateRange.from = campLog.run_date;
          this.dateRange.to = campLog.run_date;
        }
        this.filterLogMessage(this.filters);
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
