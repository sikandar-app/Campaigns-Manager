<template>
  <div>
    <div class="campaign-page-header row justify-between">>
      <div class="title vertical-middle">Campaigns</div>
      <div>
        <button class="campaign-button" @click="fixed = true">
          <q-icon name="add"></q-icon> Campaign
        </button>
      </div>
    </div>
    <div class="campaign-pagy-body">
      <q-tabs class="campaign-tabs" v-model="page" align="left">>
        <q-tab name="active" class="q-px-none textCaptlize" label="Active" />
        <q-tab name="inactive" class="q-px-none q-ml-lg textCaptlize" label="Inactive" />
      </q-tabs>
      <q-tab-panels v-model="page" animated class="q-px-none q-pt-none bg-grey-2">
        <q-tab-panel name="active" class="q-px-none q-pt-none">
          <active-campaigns></active-campaigns>
        </q-tab-panel>
        <q-tab-panel name="inactive" class="q-px-none q-pt-none">
          <inactive-campaigns></inactive-campaigns>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <q-dialog v-model="fixed">
      <create :close-modal="closeCampaignModal"></create>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import Create from "./Create.vue";
import ActiveCampaigns from "./ActiveCampaigns.vue";
import InactiveCampaigns from "./InactiveCampaigns.vue";
import { mapState, mapActions } from "pinia";
import { useAgencyStore } from "src/stores/agency";
import { useCampaignStore } from "../../stores/campaign";

export default {
  name: "AgencyCampaignsIndex",
  components: {
    Create,
    ActiveCampaigns,
    InactiveCampaigns,
  },
  data() {
    return {
      page: "active",
      fixed: ref(false),
    };
  },
  created() {
    this.fetchCampaigns();
  },
  computed: {
    ...mapState(useCampaignStore, ["campaigns"]),
    ...mapState(useAgencyStore, ["programs"]),
  },
  methods: {
    ...mapActions(useCampaignStore, ["fetchCampaigns"]),
    closeCampaignModal() {
      this.fixed = false;
      this.fetchCampaigns();
      this.page = "inactive";
    },
  },
};
</script>
