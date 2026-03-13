<template>
  <div>
    <div class="campaign-page-header row justify-between">>
      <div class="title vertical-middle">Logs</div>
    </div>
    <div class="campaign-pagy-body">
      <q-tabs class="campaign-tabs" v-model="tabName" align="left">>
        <!-- <q-tab name="campaign-logs" class="q-px-none" label="campaign Logs" />
        <q-tab
          name="messages-logs"
          class="q-px-none q-ml-lg"
          label="Messages Logs"
        /> -->
        <q-route-tab v-if="agency && agency.id" :to="'/' + agency.id + '/logs'" name="campaign-logs"
          label="Campaign Logs" class="q-px-none textCaptlize"></q-route-tab>
        <q-route-tab v-else to="/logs" name="campaign-logs" label="Campaign Logs"
          class="q-px-none textCaptlize"></q-route-tab>
        <q-route-tab v-if="agency && agency.id" :to="'/' + agency.id + '/messages/logs'" name="messages-logs"
          label="Message Logs" class="q-px-none textCaptlize q-ml-lg"></q-route-tab>
        <q-route-tab v-else to="/messages/logs" name="messages-logs" label="Message Logs"
          class="q-px-none textCaptlize q-ml-lg"
          :class="tabName == 'messages-logs' ? 'q-tab--active' : ''"></q-route-tab>
      </q-tabs>
      <q-card-section v-if="tabName == 'campaign-logs'" class="q-px-none q-pt-none bg-grey-2">
        <CampaignLogsTable />
      </q-card-section>

      <q-card-section v-if="tabName == 'messages-logs'" class="q-px-none q-py-none bg-grey-2">
        <CampaignMessagesLogsTable />
      </q-card-section>
    </div>
  </div>
</template>

<script>
import CampaignLogsTable from "./CampaignLogsTable.vue";
import CampaignMessagesLogsTable from "./CampaignMessagesLogsTable.vue";
import { useAgencyStore } from "../../stores/agency";
import { useLogStore } from "../../stores/log";
import { mapActions, mapState } from "pinia";

export default {
  name: "Logs",
  components: { CampaignLogsTable, CampaignMessagesLogsTable },
  data() {
    return {
      tabName: "campaign-logs",
    };
  },
  computed: {
    ...mapState(useAgencyStore, ["agency"]),
  },
};
</script>
