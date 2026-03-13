<template>
  <q-card class="nv-dailog-campaign-create">
    <q-toolbar class="auto-layout auto-layout-border q-pa-sm q-pl-lg">
      <q-toolbar-title class="text-h5"> Update Campaign </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <campaign-form
      ref="campaignForm"
      :campaign="campaignRecord"
      v-if="campaignRecord"
      :close-modal="closeModal"
      class="q-px-lg"
    ></campaign-form>

    <q-card-actions align="right" class="q-px-lg nv-mt-largest q-mb-lg">
      <q-btn outline label="Cancel" color="black" v-close-popup />
      <q-btn label="Update" @click.prevent="updateCampaign" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import CampaignForm from "../Form/CampaignForm.vue";

export default {
  name: "Edit",
  props: {
    campaignId: { type: Number },
    closeModal: { type: Function },
  },
  components: {
    CampaignForm,
  },
  data() {
    return {
      campaign: ref({}),
    };
  },
  created() {
    this.getCampaign();
  },
  computed: {
    campaignRecord() {
      return this.campaign;
    },
  },
  methods: {
    updateCampaign() {
      this.$refs.campaignForm.onSubmit();
    },
    getCampaign() {
      if (this.campaignId) {
        this.$loading.show();
        this.$api
          .get("/campaigns/campaign/" + this.campaignId)
          .then((response) => {
            if (response && response.data && response.data.data) {
              this.campaign = response.data.data;
            }
            this.$loading.hide();
          })
          .catch(
            function (error) {
              this.$loading.hide();
            }.bind(this)
          );
      }
    },
  },
};
</script>
