<template>
  <div>
    <q-table v-if="logs" :rows="logs" :columns="columns" table-header-style="background-color:#f3f3f3" row-key="id"
      virtual-scroll class="campaign-table-listing campaign-table-view my-sticky-header-table"
      v-bind:pagination="pagination" :rows-per-page-options="[0]" :filter="filter" @row-click="onRowClick">
      <template v-slot:top-left>
        <campaign-log-filter :is-status-show="true" :is-campaign-show="true"
          :is-log-date-show="true"></campaign-log-filter>
      </template>
      <template v-slot:top-right>
        <!-- <q-btn flat>
          <q-icon
            name="calendar_view_month"
            size="24px"
            @click="openView()"
          ></q-icon>
        </q-btn> -->

        <q-input outlined dense bg-color="white" debounce="300" v-model="filter" placeholder="Search" class="q-mr-sm">
          <template v-slot:prepend>
            <q-icon color="black" name="search" />
          </template>
        </q-input>
        <q-btn color="white" text-color="black" icon-right="archive" label="Export" no-caps @click="exportTable" />
      </template>
      <template v-slot:body-cell-campaign_id="props">
        <q-td :props="props">
          <!-- <q-btn
            flat
            class="q-pa-none"
            color="primary"
            :label="props.row.campaign.title"
            @click="redirectMsgLog(props.row.campaign.title)"
          /> -->
          <label class="text-h6">{{ props.row.campaign.title }}</label>
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge rounded color="" class="text-badge-status" :class="[
              props.row.status == 'success' || props.row.status == 'completed'
                ? 'completed-badge-status'
                : '',
            ] +
            ' ' +
            [props.row.status == 'started' ? 'progress-badge-status' : ''] +
            ' ' +
            [props.row.status == 'error' ? 'text-status-red-800' : '']
            ">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState } from "pinia";
import { useLogStore } from "../../stores/log";
import CampaignLogFilter from "src/components/CampaignLogFilter.vue";
import { useAgencyStore } from "../../stores/agency";
import { emitter } from "../../boot/bus";
import { date, exportFile } from "quasar";

export default {
  components: { CampaignLogFilter },
  data() {
    return {
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
          name: "campaign_id",
          required: true,
          label: "campaign NAME",
          align: "left",
          field: (row) =>
            row.campaign && row.campaign.title ? row.campaign.title : "",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "run_date",
          required: true,
          label: "Date",
          align: "left",
          field: (row) => row.run_date,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "started_time",
          required: true,
          label: "Start",
          align: "left",
          field: (row) => row.started_time,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "completed_time",
          required: true,
          label: "End",
          align: "left",
          field: (row) => row.completed_time,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "status",
          required: true,
          label: "Status",
          align: "left",
          field: (row) => row.status,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "data",
          required: true,
          label: "Data",
          align: "left",
          field: (row) => row.data,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "total_sent",
          required: true,
          label: "Messages",
          align: "left",
          field: (row) => row.total_sent,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      filter: ref(""),
      logs: [],
    };
  },
  watch: {
    getLogs(val) {
      this.logs = this.getLogs;
    },
  },
  computed: {
    ...mapState(useLogStore, ["getLogs"]),
    ...mapState(useAgencyStore, ["agency"]),
  },
  methods: {
    wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      formatted = formatted.split('"').join('""');
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`;
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => this.wrapCsvValue(col.label))]
        .concat(
          this.logs.map((row) =>
            this.columns
              .map((col) =>
                this.wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
    onRowClick(evt, row) {
      this.$router.push("messages/logs?q=" + row.id);
    },
    redirectMsgLog(name) {
      if (this.getAgency.id) {
        this.$router.push({
          name: "messages-logs",
          params: { agency_id: this.agency.id },
          query: { q: name },
        });
      } else {
        this.$router.push({ name: "messages-logs", query: { q: name } });
      }
    },
    filterLogEvent(val) {
      let logs = [];
      if (val.campaigns && val.campaigns.length > 0) {
        this.getLogs.forEach((log) =>
          val.campaigns.forEach((campaignId) =>
            log.campaign_id == campaignId ? logs.push(log) : ""
          )
        );
      } else {
        logs = this.getLogs;
      }

      if (val.dateRange.from && val.dateRange.to) {
        logs = logs.filter(
          (log) =>
            date.formatDate(log.date) >= date.formatDate(val.dateRange.from) &&
            date.formatDate(log.date) <= date.formatDate(val.dateRange.to)
        );
      }

      if (val.status) {
        logs = logs.filter((log) => log.status == val.status);
      }

      this.logs = logs;
      emitter.emit("close");
    },
    restoreLogEvent() {
      this.logs = this.getLogs;
      emitter.emit("close");
    },
  },
  mounted() {
    this.logs = this.getLogs;
  },
  created() {
    emitter.on("filter-log-event", this.filterLogEvent);
    emitter.on("restore-log-event", this.restoreLogEvent);
  },
};
</script>

<style></style>
