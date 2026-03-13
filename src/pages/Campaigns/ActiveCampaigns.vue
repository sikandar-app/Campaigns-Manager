<template>
  <div class="q-pt-none">
    <campaigns-grid
      :campaigns="campaignsList"
      v-if="campaignsList && isTableView == 0"
    ></campaigns-grid>
    <campaigns-table
      :campaigns="campaignsList"
      v-else-if="campaignsList && isTableView == 1"
    ></campaigns-table>
  </div>
</template>

<script>
import CampaignsGrid from "./CampaignsGrid.vue";
import CampaignsTable from "./CampaignsTable.vue";
import { useCampaignStore } from "../../stores/campaign";
import { mapState, mapActions } from "pinia";

export default {
  name: "active",
  props: ["programs"],
  components: {
    CampaignsGrid,
    CampaignsTable,
  },
  computed: {
    ...mapState(useCampaignStore, ["getCampaigns"]),
    campaignsList() {
      return (
        this.getCampaigns &&
        this.getCampaigns.filter((campaign) => {
          return campaign.active == 1;
        })
      );
    },
    isTableView() {
      return this.$route.query.tableView
        ? parseInt(this.$route.query.tableView)
        : 0;
    },
  },
};
</script>
