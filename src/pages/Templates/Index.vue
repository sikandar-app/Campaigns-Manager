<template>
  <div>
    <div class="campaign-page-header row justify-between">>
      <div class="title vertical-middle">Templates</div>
      <div>
        <q-btn class="campaign-button" :to="{
          name: 'template.create',
        }">
          <q-icon name="add"></q-icon> template
        </q-btn>
      </div>
    </div>
    <div class="campaign-pagy-body">
      <q-tabs class="campaign-tabs" v-model="page" align="left">
        <q-tab name="campaigns" class="q-px-none" label="Campaigns" />
        <q-tab name="presets" class="q-px-none q-ml-lg" label="Presets" />
      </q-tabs>
      <q-tab-panels v-model="page" animated>
        <q-tab-panel name="campaigns" class="q-px-none q-pt-none bg-grey-2">
          <campaigns />
        </q-tab-panel>

        <q-tab-panel name="presets" class="q-px-none q-py-none bg-grey-2">
          <presets />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Campaigns from "./Campaigns.vue";
import Presets from "./Presets.vue";

export default {
  name: "AgencyTemplateIndex",
  components: {
    Campaigns,
    Presets,
  },
  data() {
    return {
      page: "campaigns",
    };
  },
};
</script>
