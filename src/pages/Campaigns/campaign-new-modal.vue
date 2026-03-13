<template>
  <q-card class="nv-dailog-specific-width">
    <q-toolbar class="auto-layout auto-layout-border nv-border-bottom">
      <q-toolbar-title class="text-h5"> New Campaign </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <div class="q-px-lg q-pt-md">
      <div class="row q-col-gutter-xs">
        <div class="col-8 col-auto">
          <div class="q-pa-md nv-border q-ma-sm">
            <div class="text-subtitle2 text-grey q-mb-sm">DETAILS</div>
            <label class="text-h6">Campaign Name</label>
            <q-input
              outlined
              dense
              v-model="campaignName"
              placeholder="Campaign Name"
              class="col-5"
            />
            <q-card class="no-shadow q-mt-md">
              <label class="text-h6"> Message </label>
              <label class="float-right">
                <q-btn-dropdown
                  text-color="primary"
                  label="English"
                  flat
                  class="nv-filter-btn q-pr-none text-capitalize"
                  icon="language"
                  v-model="language"
                >
                  <q-list>
                    <q-item clickable v-close-popup>
                      <span
                        class="material-icons-outlined q-pl-none q-mr-sm font-size-14"
                        avatar
                      >
                        visibility
                      </span>
                      <q-item-section class="text-capitalize">
                        Arabic
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                <q-btn
                  flat
                  color="primary"
                  class="nv-filter-btn text-capitalize"
                  >Clear</q-btn
                >
                <q-btn-dropdown
                  text-color="primary"
                  label="Presets"
                  flat
                  class="nv-filter-btn q-pr-none text-capitalize"
                >
                  <q-list>
                    <q-item clickable v-close-popup>
                      <span
                        class="material-icons-outlined q-pl-none q-mr-sm font-size-14"
                        avatar
                      >
                        visibility
                      </span>
                      <q-item-section class="text-capitalize">
                        Preview
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </label>
              <textarea
                class="message-textarea"
                placeholder="Write a message less than 140 characters..."
                rows="5"
                cols="33"
              ></textarea>
            </q-card>
          </div>
          <div class="q-pa-md nv-border q-ma-sm q-mt-lg">
            <label class="text-h6 text-subtitle2 text-grey"> SCHEDULE </label>
            <label class="float-right nv-nagitive-margin">
              <q-btn
                flat
                color="primary"
                class="nv-filter-btn q-pa-none q-mr-sm text-capitalize"
                >Clear</q-btn
              >
              <q-btn-dropdown
                text-color="primary"
                label="Presets"
                flat
                class="nv-filter-btn q-pa-none text-capitalize"
              >
                <q-list>
                  <q-item clickable v-close-popup>
                    <span
                      class="material-icons-outlined q-pl-none q-mr-sm font-size-14"
                      avatar
                    >
                      visibility
                    </span>
                    <q-item-section> Preview </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </label>

            <div class="row full-width">
              <div class="col q-ml-sm">
                <label class="text-h6">From</label>
                <q-select
                  outlined
                  dense
                  v-model="from"
                  :options="fromOptions"
                />
              </div>
              <div class="col q-ml-sm">
                <label class="text-h6">At</label>
                <q-input
                  outlined
                  dense
                  v-model="at"
                  mask="time"
                  :rules="['time']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="at">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row full-width">
              <div class="col q-ml-sm">
                <label class="text-h6">Every</label>
                <q-select
                  outlined
                  dense
                  v-model="every"
                  :options="everyOptions"
                />
              </div>
              <div class="col q-ml-sm">
                <label class="text-h6">On</label>
                <div class="nv-week-block">
                  <q-checkbox
                    dense
                    class="nv-week-days-select"
                    v-model="onSunday"
                    true-value="sunday"
                    label="S"
                  />
                  <q-checkbox
                    dense
                    class="nv-week-days-select"
                    v-model="onMonday"
                    true-value="monday"
                    label="M"
                  />
                  <q-checkbox
                    dense
                    class="nv-week-days-select"
                    v-model="onTuesday"
                    true-value="tuesday"
                    label="T"
                  />
                  <q-checkbox
                    dense
                    class="nv-week-days-select"
                    v-model="onWednesday"
                    true-value="wednesday"
                    label="W"
                  />

                  <q-checkbox
                    dense
                    class="nv-week-days-select"
                    v-model="onThursday"
                    true-value="thursday"
                    label="T"
                  />
                  <q-checkbox
                    dense
                    class="nv-week-days-select"
                    v-model="onFriday"
                    true-value="friday"
                    label="F"
                  />
                  <q-checkbox
                    dense
                    class="nv-week-days-select"
                    v-model="onSaturday"
                    true-value="saturday"
                    label="S"
                  />
                </div>
              </div>
            </div>
            <div class="row full-width">
              <div class="col q-ml-sm q-mt-sm">
                <label class="text-h6">Until</label>
                <q-select
                  outlined
                  dense
                  v-model="until"
                  :options="untilOptions"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 q-px-md q-pt-md nv-border q-mt-sm nv-margin-dailog">
          <label class="text-h6 text-subtitle2 text-grey"> AUDIENCE</label>
          <label class="float-right nv-nagitive-margin">
            <q-btn
              flat
              color="primary"
              class="nv-filter-btn q-pa-none q-mr-sm text-capitalize"
              >Clear</q-btn
            >
            <q-btn-dropdown
              text-color="primary"
              label="Presets"
              flat
              class="nv-filter-btn q-pa-none text-capitalize"
            >
              <q-list>
                <q-item clickable v-close-popup>
                  <span
                    class="material-icons-outlined q-pl-none q-mr-sm font-size-14"
                    avatar
                  >
                    visibility
                  </span>
                  <q-item-section> Preview </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </label>
          <div class="text-h6 q-mt-md">Programs</div>
          <q-select
            outlined
            dense
            v-model="program"
            :options="programOptions"
          />
          <div class="text-h6 q-mt-md">Location</div>
          <q-select
            outlined
            dense
            v-model="program"
            :options="programOptions"
          />
          <div class="text-h6 q-mt-md">Discipline</div>
          <q-select
            outlined
            dense
            v-model="program"
            :options="programOptions"
          />
          <div class="text-h6 q-mt-md">Signed up</div>
          <q-select
            outlined
            dense
            v-model="signedup"
            :options="signedupOptions"
          />
          <div class="text-h6 q-mt-md">Progress range</div>
          <q-select
            outlined
            dense
            v-model="progressRange"
            :options="progressRangeOptions"
          />
          <div class="text-h6 q-mt-md">Days before due date</div>
          <q-select
            outlined
            dense
            v-model="dueDate"
            :options="dueDateOptions"
          />
          <div for="" class="q-pt-sm nv-text-base text-grey-6 float-right">
            (Estimated 198 Employees)
          </div>
        </div>
      </div>
    </div>

    <q-card-actions align="right" class="nv-mt-largest q-pb-lg">
      <q-btn outline label="Cancel" class="cancel-btn" v-close-popup />
      <q-btn label="Create" color="primary" v-close-popup />
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
      language: null,
    };
  },
});
</script>
