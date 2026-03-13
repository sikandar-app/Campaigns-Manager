<template>
  <div>
    <q-table v-if="records" :rows="records" :columns="columns" table-header-style="background-color:#f3f3f3"
      row-key="id" virtual-scroll class="campaign-table-listing campaign-table-view q-mt-sm my-sticky-header-table"
      v-bind:pagination="pagination" :rows-per-page-options="[0]" :filter="filter" v-model:selected="selected">
      <template v-slot:top-left>
        <div class="filters-templates-checkbox">
          <q-checkbox dense v-model="signup" label="Sign up" class="q-mr-sm" />
          <q-checkbox dense v-model="reminders" label="Reminders" class="q-mr-sm" />
          <q-checkbox dense v-model="duesoon" label="Due Soon" />
        </div>
      </template>
      <template v-slot:top-right>
        <q-btn flat>
          <q-icon name="calendar_view_month" size="24px" @click="openView()"></q-icon>
        </q-btn>

        <q-input outlined dense bg-color="white" debounce="300" v-model="filter" placeholder="Search" class="q-mr-sm">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-title="props">
        <q-td :props="props">
          <label class="text-h6">{{ props.row.title }}</label>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn-dropdown text-color="black" flat dense class="text-h6 remove-background imgThreeDots"
            dropdown-icon="none" :outline="false">
            <q-list>
              <q-item clickable v-close-popup>
                <span class="material-icons-outlined q-pl-none q-mr-sm font-size-14" avatar>
                  pause_circle
                </span>
                <q-item-section> Deactivate </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item clickable v-close-popup :to="{
                name: 'agency.campaign.edit',
              }">
                <span class="material-icons-outlined q-pl-none q-mr-sm font-size-14" avatar>
                  edit
                </span>
                <q-item-section> Edit </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item clickable v-close-popup>
                <span class="material-icons-outlined q-pl-none q-mr-sm font-size-14" avatar>
                  visibility
                </span>
                <q-item-section> Duplicate </q-item-section>
              </q-item>
            </q-list>
            <q-separator />
            <q-list>
              <q-item clickable v-close-popup>
                <span class="material-icons-outlined q-pl-none q-mr-sm font-size-14" avatar>
                  delete
                </span>
                <q-item-section> Remove </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["campaigns"],

  data() {
    return {
      pagination: {
        rowsPerPage: 100,
      },
      records: [],
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
          name: "days",
          required: true,
          lable: "DAYS",
          align: "left",
          field: (row) => row.days,
          sortable: true,
        },
        {
          name: "time",
          required: true,
          lable: "HOUR",
          align: "left",
          field: (row) => row.time,
        },
        {
          name: "audiece_count",
          required: false,
          lable: "AUDIENCE",
          align: "left",
          field: (row) => row.audience_count,
        },
        {
          name: "days_left",
          required: false,
          lable: "END IN",
          align: "left",
          field: (row) => row.days_left,
        },
        { name: "actions", align: "left", label: "Action" },
      ],
      filter: ref(""),
      signup: ref(false),
      reminders: ref(false),
      duesoon: ref(false),
      selected: ref([]),
    };
  },
  created() {
    this.records = this.campaigns;
  },
  methods: {
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${this.selected.length > 1 ? "s" : ""
        } selected of ${this.records.length}`;
    },
    openView() {
      this.$router.push({ path: this.$route.path, query: { tableView: 0 } });
    },
  },
};
</script>

<style></style>
