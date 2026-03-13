<template>
  <q-select
    v-if="agency.id"
    class="q-mr-sm text-h6 filter-design"
    dense
    rounded
    standout="bg-teal text-white"
    v-model="program"
    :options="programOptions"
    multiple
    map-options
    :lazy-rules="true"
    :options-dense="true"
    input-debounce="0"
    :display-value="'All Programs'"
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
    v-if="agency.id"
    class="q-mr-sm text-h6 filter-design"
    dense
    rounded
    standout="bg-teal text-white"
    v-model="status"
    option-value="id"
    option-label="name"
    :options="statusOptions"
    multiple
    map-options
    :lazy-rules="true"
    :options-dense="true"
    input-debounce="0"
    :display-value="status && status.name ? status.name : 'All Statuses'"
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
import { mapState, mapActions } from "pinia";
export default {
  data() {
    return {
      program: ref([]),
      status: ref([]),
      statusOptions: [
        { id: "live", name: "Live" },
        { id: "scheduled", name: "Scheduled" },
        { id: "expired", name: "Expired" },
      ],
      filters: {
        program: 0,
        status: 0,
      },
      selectedAgency: null,
      agenciesOptions: this.agencies,
    };
  },
  watch: {
    program(val) {
      let programIds = [];
      this.program.forEach((program) => {
        programIds.push(program.id);
      });
      this.filters.program = JSON.stringify(programIds);
      this.getfilterCampaigns(this.filters);
    },
    status(val) {
      let status = [];
      this.status.forEach((statusData) => {
        status.push(statusData.id);
      });
      this.filters.status = JSON.stringify(status);
      this.getfilterCampaigns(this.filters);
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
    programOptions() {
      let programs = [];
      this.getPrograms.forEach((program) => {
        programs.push({ id: program.id, name: program.name });
      });
      return programs;
    },
  },
  methods: {
    ...mapActions(useCampaignStore, ["filterCampaigns"]),
    ...mapActions(useAgencyStore, ["setAgency"]),
    filterAgencies(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.agenciesOptions = this.agencies.filter(
          (v) => v.name.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },
    getfilterCampaigns(filters) {
      this.filterCampaigns(filters);
    },
  },
};
</script>
