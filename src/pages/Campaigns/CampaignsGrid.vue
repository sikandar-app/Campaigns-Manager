<template>
  <div>
    <q-dialog v-model="editForm">
      <edit
        :campaign-id="campaignId"
        :close-modal="closeCampaignModal"
        v-if="campaignId"
      ></edit>
    </q-dialog>
    <q-table
      v-if="campaigns"
      grid
      bordered
      rounded-borders
      title=""
      :rows="campaigns"
      :columns="columns"
      row-key="id"
      hide-header
      :filter="filter"
      class="nv-table-listing q-mt-sm q-mx-md"
      selection="multiple"
      v-model:selected="selected"
    >
      <template v-slot:top-left>
        <campaign-filter></campaign-filter>
      </template>
      <template v-slot:top-right>
        <q-btn flat>
          <q-icon name="o_table_rows" size="24px" @click="openView()"></q-icon>
        </q-btn>

        <q-input
          outlined
          dense
          bg-color="white"
          debounce="300"
          v-model="filter"
          placeholder="Search"
          style="border-radius: 16px"
          class="q-mr-sm"
        >
          <template v-slot:prepend>
            <q-icon color="black" name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div key="id" class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card
            flat
            bordered
            class="nv-card"
            :class="
              props.selected
                ? $q.dark.isActive
                  ? 'bg-grey-9'
                  : 'bg-grey-2'
                : ''
            "
          >
            <q-card-section class="q-pa-none">
              <div class="row full-width">
                <div class="col">
                  <div class="">
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
                          props.row.status == 'Scheduled'
                            ? 'text-status-yellow-800'
                            : '',
                        ] +
                        ' ' +
                        [
                          props.row.status == 'Expired'
                            ? 'text-status-grey-800'
                            : '',
                        ]
                      "
                    >
                      {{ props.row.status }}
                    </q-badge>
                  </div>
                  <label class="text-h4">
                    {{ props.row.title }}
                  </label>
                </div>
                <div class="col-auto">
                  <q-btn color="grey-7 q-pb-md" round flat icon="more_vert">
                    <q-menu
                      anchor="top right"
                      self="top right"
                      cover
                      auto-close
                    >
                      <campaign-actions
                        :campaign="props.row"
                        :open-update-modal="openUpdateModal"
                      ></campaign-actions>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
              <div class="row content-end q-pb-sm" style="min-height: 48px">
                <div class="q-mr-md text-icon-grid" v-if="props.row.days">
                  <q-icon
                    name="calendar_today"
                    class="q-mb-xs q-mr-xs"
                  ></q-icon>
                  <label class="">{{ props.row.days }}</label>
                </div>
                <div class="q-mr-md text-icon-grid" v-if="props.row.time">
                  <q-icon name="schedule" class="q-mb-xs q-mr-xs"></q-icon>
                  <label class="">{{ props.row.time }}</label>
                </div>
                <div class="text-icon-grid" v-if="props.row.audience_count">
                  <q-icon name="group" class="q-mr-xs"></q-icon>
                  <label class="">{{ props.row.audience_count }}</label>
                </div>
              </div>
              <div class="row items-center justify-between q-mt-sm">
                <div class="col-8 text-subtitle1">
                  <q-linear-progress
                    rounded
                    inline
                    size="10px"
                    :value="props.row.total_days"
                    color="secondary"
                    class="nv-linear-progress nv-inline-block"
                  />
                  <span class="nv-inline-block"
                    >{{ props.row.days_left_human }}
                  </span>
                </div>
                <!-- <div class="col-4 text-subtitle1">
                  <span>{{ props.row.days_left }} days left</span>
                </div> -->
                <div class="text-subtitle1 q-mr-md">
                  ID - {{ props.row.id }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
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
  components: { CampaignActions, Edit, CampaignFilter },
  props: ["campaigns"],
  data() {
    return {
      campaignId: null,
      editForm: false,
      columns: [
        {
          name: "status",
          required: true,
          lable: "title",
          align: "left",
          field: "status",
        },
        {
          name: "title",
          required: true,
          label: "Title",
          align: "left",
          field: (row) => (row && row.title ? row.title : ""),
        },
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => (row && row.id ? row.id : ""),
        },
        {
          name: "days",
          required: false,
          lable: "Days",
          field: "days",
        },
        {
          name: "time",
          required: false,
          lable: "Time",
          field: "time",
        },
        {
          name: "audiece_count",
          required: false,
          lable: "Audience Count",
          field: "audiece_count",
        },
        {
          name: "days_left",
          required: false,
          lable: "Days Left",
          field: "days_left",
        },
      ],
      filter: ref(""),
      program: ref("All programs"),
      programOptions: ["All programs"],
      status: ref("All status"),
      statusOptions: ["All statuses", "Live", "Scheduled", "Expired"],
      date: ref("All dates"),
      dateOptions: ["All dates"],
      audience: ref("All Audiences"),
      audienceOptions: ["All Audiences"],
      selected: [],
    };
  },
  methods: {
    ...mapActions(useCampaignStore, ["fetchCampaigns"]),
    openView() {
      this.$router.push({ path: this.$route.path, query: { tableView: 1 } });
    },
    openUpdateModal(campaignId) {
      this.campaignId = campaignId;
      this.editForm = true;
    },
    closeCampaignModal() {
      this.editForm = false;
      this.fetchCampaigns();
    },
  },
};
</script>

<style></style>
