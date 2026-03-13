<template>
  <q-card class="nv-dailog-campaign-create">
    <q-toolbar class="auto-layout auto-layout-border q-pa-sm q-pl-lg">
      <q-toolbar-title class="text-h5"> New Campaign </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <campaign-form
      ref="campaignForm"
      :close-modal="closeModal"
      class="q-px-lg"
    ></campaign-form>

    <q-card-actions align="right" class="q-px-lg nv-mt-largest q-mb-lg">
      <q-btn outline label="Cancel" color="black" v-close-popup />
      <q-btn label="Create" @click.prevent="createCampaign" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import CampaignForm from "../Form/CampaignForm.vue";

export default defineComponent({
  components: { CampaignForm },
  name: "createCampaign",
  props: {
    closeModal: { type: Function },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    createCampaign() {
      this.$refs.campaignForm.onSubmit();
    },
  },
});
</script>
