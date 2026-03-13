<template>
  <div>
    <q-table v-if="messages" :rows="messages" :columns="columns" table-header-style="background-color:#f3f3f3"
      row-key="id" virtual-scroll class="campaign-table-listing campaign-table-view my-sticky-header-table"
      v-bind:pagination="pagination" :rows-per-page-options="[0]" :filter="filter">
      <template v-slot:top-left>
        <campaign-log-message-Filter :is-status-show="false" :is-campaign-show="true"
          :is-log-date-show="true"></campaign-log-message-Filter>
      </template>
      <template v-slot:top-right>
        <q-input outlined dense bg-color="white" debounce="300" v-model="filter" placeholder="Search" class="q-mr-sm">
          <template v-slot:prepend>
            <q-icon color="black" name="search" />
          </template>
        </q-input>
        <q-btn color="white" text-color="black" icon-right="archive" label="Export" no-caps @click="exportTable" />
      </template>
      <template v-slot:body-cell-campaign_id="props">
        <q-td :props="props">
          <label class="text-h6">{{ props.row.campaign.title }}</label>
        </q-td>
      </template>
      <template v-slot:body-cell-message="props">
        <q-td :props="props">
          <div class="row justify-center">
            <div style="width: 200px" class="customEllipsis">
              {{ props.row.message }}
            </div>
          </div>
          <q-tooltip> {{ props.row.message }} </q-tooltip>
        </q-td>
      </template>
      <template v-slot:body-cell-progress="props">
        <q-td :props="props">
          <q-linear-progress rounded inline size="10px" :value="progressCal(props.row.progress)" color="secondary"
            class="campaign-linear-progress campaign-inline-block" />
          {{ props.row.progress }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState } from "pinia";
import { useLogStore } from "../../stores/log";
import CampaignLogMessageFilter from "src/components/CampaignLogMessageFilter.vue";
import { emitter } from "../../boot/bus";
import { date, exportFile } from "quasar";

export default {
  components: { CampaignLogMessageFilter },
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
          name: "first_name",
          required: true,
          label: "First Name",
          align: "left",
          field: (row) => row.first_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "last_name",
          required: true,
          label: "Last Name",
          align: "left",
          field: (row) => row.last_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "phone_number",
          required: true,
          label: "Phone Number",
          align: "left",
          field: (row) => row.phone_number,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "message",
          required: true,
          label: "Message",
          align: "left",
          field: (row) => row.message,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "created_at",
          required: true,
          label: "Sent Time",
          align: "left",
          field: (row) => row.created_at,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      filter: ref(""),
      messages: [],
    };
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
          this.messages.map((row) =>
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
    progressCal(progress) {
      return progress / 100;
    },
    openView() {
      this.$router.push({ path: this.$route.path, query: { tableView: 0 } });
    },
    filterMessageLogEvent(val) {
      let messages = [];
      if (val.campaigns && val.campaigns.length > 0) {
        this.getMessageLogs.forEach((msg) =>
          val.campaigns.forEach((campaignId) =>
            msg.campaign_id == campaignId ? messages.push(msg) : ""
          )
        );
      } else {
        messages = this.getMessageLogs;
      }

      // if (val.programs && val.programs.length > 0) {
      //   messages = messages.filter((msg) =>
      //     msg.campaign.programs.every((program) =>
      //       val.programs.every((programId) => program.program_id == programId)
      //     )
      //   );
      // }
      if (val.dateRange.from && val.dateRange.to) {
        messages = messages.filter(
          (msg) =>
            date.formatDate(msg.date) >= date.formatDate(val.dateRange.from) &&
            date.formatDate(msg.date) <= date.formatDate(val.dateRange.to)
        );
      }

      this.messages = messages;
      emitter.emit("close");
    },
  },
  computed: {
    ...mapState(useLogStore, ["getMessageLogs"]),
  },
  mounted() {
    this.messages = this.getMessageLogs;
  },
  created() {
    emitter.on("filter-message-log-event", this.filterMessageLogEvent);
  },
};
</script>
