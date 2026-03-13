<template>
  <q-card class="campaign-dailog-audience-preset">>
    <q-toolbar class="auto-layout auto-layout-border q-px-lg q-py-sm">
      <q-toolbar-title> Audience Presets </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>
    <q-separator />
    <div class="q-px-lg q-py-sm">
      <div class="row q-col-gutter-xs">
        <div class="col-3">
          <div class="row q-pa-sm">
            <div class="col">
              <label class="text-h6 text-subtitle2 text-grey">
                + New audience preset
              </label>
            </div>
          </div>
          <div class="row q-pa-sm q-mt-md">
            <div class="col">
              <label class="text-h6 text-primary"> Not signed up </label>
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
            </div>
          </div>
          <div class="row q-pa-sm">
            <div class="col">
              <label class="campaign-text-base text-grey-8"> More than 50% </label>
            </div>
          </div>
          <div class="row q-pa-sm">
            <div class="col">
              <label class="campaign-text-base text-grey-8"> 0% </label>
            </div>
          </div>
          <div class="row q-pa-sm">
            <div class="col">
              <label class="campaign-text-base text-grey-8"> More than 85% </label>
            </div>
          </div>
          <div class="row q-pa-sm">
            <div class="col">
              <label class="campaign-text-base text-grey-8">
                Close to due date
              </label>
            </div>
          </div>
          <div class="row q-pa-sm">
            <div class="col">
              <label class="campaign-text-base text-grey-8">
                Not signed up ZoharCare HHAX NY
              </label>
            </div>
          </div>
        </div>
        <div class="col-9 col-auto">
          <div class="row">
            <div class="col">
              <label class="text-h6">TITLE</label>
              <q-input outlined dense placeholder="Title" class="col-5" />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-9">
              <label class="text-h6">ACCESS</label>
              <q-input outlined label-slot clearable label="Standard" stack-label
                placeholder="Only specific Agencies and desciplines">
                <template v-slot:prepend>
                  <q-avatar>
                    <img src="../../assets/filter.svg" />
                  </q-avatar>
                </template>

                <template v-slot:label>
                  <span class="text-weight-bold text-grey-8">Specified</span>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-9">
              <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
                outlined dense class="q-mt-sm">
                <template v-slot:before>
                  <label class="campaign-text-base campaign-label-form text-grey-7">Agencies</label>
                </template>
              </q-select>
              <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
                outlined dense class="q-mt-sm">
                <template v-slot:before>
                  <label class="campaign-text-base campaign-label-form text-grey-7">Integrations</label>
                </template>
              </q-select>
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col">
              <label class="text-h6">AUDIENCE</label>
              <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
                outlined dense class="q-mt-sm">
                <template v-slot:before>
                  <label class="campaign-text-base campaign-label-form text-grey-7">Programs</label>
                </template>
              </q-select>
              <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
                outlined dense class="q-mt-fourteen">
                <template v-slot:before>
                  <label class="campaign-text-base campaign-label-form text-grey-7">Location</label>
                </template>
              </q-select>
              <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
                outlined dense class="q-mt-fourteen">
                <template v-slot:before>
                  <label class="campaign-text-base campaign-label-form text-grey-7">Discipline</label>
                </template>
              </q-select>
              <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
                outlined dense class="q-mt-fourteen">
                <template v-slot:before>
                  <label class="campaign-text-base campaign-label-form text-grey-7">Signed up</label>
                </template>
              </q-select>
              <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
                outlined dense class="q-mt-fourteen">
                <template v-slot:before>
                  <label class="campaign-text-base campaign-label-form text-grey-7">Progress range</label>
                </template>
              </q-select>
              <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
                outlined dense class="q-mt-fourteen">
                <template v-slot:before>
                  <label class="campaign-text-base campaign-label-form text-grey-7">Progress status</label>
                </template>
              </q-select>
              <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
                outlined dense class="q-mt-fourteen">
                <template v-slot:before>
                  <label class="campaign-text-base campaign-label-form text-grey-7">Days before due date</label>
                </template>
              </q-select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-card-actions align="right" class="campaign-mt-largest">
      <q-btn label="Save" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NewCampaign",
  data() {
    return {
      campaignName: null,
      tab: ref("english"),
      fromOptions: ["Today"],
      everyOptions: ["Week"],
      every: "Week",
      presetOptions: ["Presets"],
      presets: null,
      from: "Today",
      at: ref("10:56"),
      onSunday: ref(null),
      onMonday: ref(null),
      onTuesday: ref(null),
      onWednesday: ref(null),
      onThursday: ref(null),
      onFriday: ref(null),
      onSaturday: ref(null),
      untilOptions: ["The end of the year"],
      until: "The end of the year",
      programOptions: ["Any"],
      program: "Any",
      signedupOptions: ["Both signed up and not signed up"],
      signedup: "Both signed up and not signed up",
      progressRangeOptions: ["0 - 100%"],
      progressRange: "0 - 100%",
      dueDateOptions: ["7 Days"],
      dueDate: "7 Days",
    };
  },
});
</script>
