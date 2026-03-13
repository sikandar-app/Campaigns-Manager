<template>
  <div class="">
    <q-dialog v-model="editForm">
      <edit
        :campaign-id="campaignId"
        :close-modal="closeCampaignModal"
        v-if="campaignId"
      ></edit>
    </q-dialog>
    <q-table
      v-if="records"
      :rows="records"
      :columns="columns"
      table-header-style="background-color:#f3f3f3"
      row-key="id"
      virtual-scroll
      class="nv-table-listing nv-table-view my-sticky-header-table"
      v-bind:pagination="pagination"
      :rows-per-page-options="[0]"
      :filter="filter"
    >
      <template v-slot:top-left>
        <campaign-filter></campaign-filter>
      </template>
      <template v-slot:top-right>
        <q-btn flat @click="openView()">
          <q-icon name="calendar_view_month" size="24px"></q-icon>
        </q-btn>

        <q-input
          outlined
          dense
          bg-color="white"
          debounce="300"
          v-model="filter"
          placeholder="Search"
          class="q-mr-sm"
        >
          <template v-slot:prepend>
            <q-icon color="black" name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            rounded
            color=""
            class="text-badge-status"
            :class="
              [
                props.row.status == 'Live'
                  ? 'background-green-500 text-status-green-800'
                  : '',
              ] +
              ' ' +
              [
                props.row.status == 'Scheduled' ? 'text-status-yellow-800' : '',
              ] +
              ' ' +
              [props.row.status == 'Expired' ? 'text-status-grey-800' : '']
            "
          >
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn-dropdown
            text-color="black"
            flat
            dense
            class="text-h6 remove-background imgThreeDots"
            dropdown-icon="none"
            :outline="false"
          >
            <campaign-actions
              :campaign="props.row"
              :open-update-modal="openUpdateModal"
            ></campaign-actions>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import Edit from "./Edit.vue";
import CampaignFilter from "src/components/CampaignFilter.vue";
import CampaignActions from "src/components/CampaignActions.vue";
import { mapActions } from "pinia";
import { useCampaignStore } from "../../stores/campaign";

export default {
  components: { CampaignActions, CampaignFilter, Edit },
  props: ["campaigns"],
  data() {
    return {
      campaignId: null,
      editForm: false,
      pagination: {
        rowsPerPage: 100,
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "title",
          required: true,
          label: "NAME",
          align: "left",
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "status",
          required: true,
          label: "status",
          align: "left",
          field: (row) => row.active,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "programs",
          required: true,
          label: "PROGRAMS",
          align: "left",
          field: (row) => row.program_names,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "days",
          required: true,
          label: "DAYS",
          align: "left",
          field: (row) => row.days,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "time",
          required: true,
          label: "HOUR",
          align: "left",
          field: (row) => row.time,
        },
        {
          name: "start_date",
          required: false,
          label: "Start date",
          align: "left",
          field: (row) =>
            row.schedule && row.schedule.start_date
              ? row.schedule.start_date
              : null,
        },
        {
          name: "end_date",
          required: false,
          label: "End date",
          align: "left",
          field: (row) =>
            row.schedule && row.schedule.end_date
              ? row.schedule.end_date
              : null,
        },
        { name: "actions", align: "left", label: "Action" },
      ],
      filter: ref(""),
    };
  },
  computed: {
    records() {
      return this.campaigns;
    },
  },
  methods: {
    ...mapActions(useCampaignStore, ["fetchCampaigns"]),
    openUpdateModal(campaignId) {
      this.campaignId = campaignId;
      this.editForm = true;
    },
    openView() {
      this.$router.push({ path: this.$route.path, query: { tableView: 0 } });
    },
    closeCampaignModal() {
      this.editForm = false;
      this.fetchCampaigns();
    },
  },
};
</script>
