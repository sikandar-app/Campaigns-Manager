<template>
  <div>
    <q-list style="width: 200px; border-radius: 16px">
      <q-item clickable @click="redirectLog(campaign.id)">
        <q-item-section>
          <div class="row">
            <q-icon name="o_receipt_long" class="q-mr-md" size="19px"></q-icon>
            Campaign logs
          </div>
        </q-item-section>
      </q-item>

      <q-item clickable @click="redirectMessageLog(campaign.id)">
        <q-item-section>
          <div class="row">
            <q-icon name="o_receipt_long" class="q-mr-md" size="19px"></q-icon>
            Messages logs
          </div>
        </q-item-section>
      </q-item>

      <q-separator></q-separator>

      <q-item clickable @click="deactivate" v-if="campaign.active == 1">
        <q-item-section>
          <div class="row">
            <q-icon name="o_toggle_on" class="q-mr-md" size="19px"></q-icon>
            Deactivate
          </div>
        </q-item-section>
      </q-item>
      <q-item clickable @click="activate" v-else-if="campaign.active == 0">
        <q-item-section>
          <div class="row">
            <q-icon name="o_toggle_on" class="q-mr-md" size="19px"></q-icon>
            Activate
          </div>
        </q-item-section>
      </q-item>
      <q-item clickable @click="updateModal(campaign.id)">
        <q-item-section>
          <div class="row">
            <q-icon name="o_edit" class="q-mr-md" size="19px"></q-icon>
            Edit
          </div>
        </q-item-section>
      </q-item>
      <q-item clickable @click="distroy">
        <q-item-section>
          <div class="row">
            <q-icon name="o_delete" class="q-mr-md" size="19px"></q-icon>
            Remove
          </div></q-item-section
        >
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { useCampaignStore } from "../stores/campaign";
import { useAgencyStore } from "../stores/agency";

import { mapActions, mapState } from "pinia";

export default {
  props: {
    campaign: {
      type: Object,
    },
    openUpdateModal: { type: Function },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useAgencyStore, ["agency"]),
  },
  methods: {
    ...mapActions(useCampaignStore, ["fetchCampaigns"]),
    updateModal(campaignId) {
      this.openUpdateModal(campaignId);
    },
    activate() {
      this.$api
        .get("/campaigns/" + this.campaign.id + "/1")
        .then((response) => {
          this.fetchCampaigns();
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    deactivate() {
      this.$api
        .get("/campaigns/" + this.campaign.id + "/0")
        .then((response) => {
          this.fetchCampaigns();
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    distroy() {
      this.$api
        .delete("/campaigns/" + this.campaign.id)
        .then((response) => {
          this.fetchCampaigns();
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    redirectLog(id) {
      if (this.agency.id) {
        this.$router.push({
          name: "campaign-logs",
          params: { agency_id: this.agency.id },
          query: { q: id },
        });
      } else {
        this.$router.push({ name: "campaign-logs", query: { q: id } });
      }
    },
    redirectMessageLog(id) {
      if (this.agency.id) {
        this.$router.push({
          name: "messages-logs",
          params: { agency_id: this.agency.id },
          query: { campaign_id: id },
        });
      } else {
        this.$router.push({
          name: "messages-logs",
          query: { campaign_id: id },
        });
      }
    },
  },
};
</script>
