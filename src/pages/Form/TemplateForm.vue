<template>
  <div class="">
    <div class="row full-width">
      <div class="col">
        <q-card class="campaign-dailog-specific-width-form q-mt-md">
          <div class="campaign-border q-ma-sm">
            <div class="text-subtitle2 text-grey q-mb-md">DETAILS</div>
            <label class="text-h6">Title</label>
            <q-input outlined dense v-model="title" placeholder="Title" class="col-5" />
            <q-card class="no-shadow q-mt-md">
              <label class="text-h6"> Message </label>
              <label class="float-right">
                <q-btn-dropdown text-color="primary" label="Presets" flat class="campaign-filter-btn">
                  <q-list>
                    <q-item clickable @click="messageModal = true">
                      <q-item-section> Message Preset </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </label>
              <textarea class="message-textarea" placeholder="Write a message less than 140 characters..." rows="5"
                cols="33"></textarea>

              <q-btn-dropdown text-color="primary" label="English" flat class="campaign-tab-lang">
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section> Preview </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <div class="row q-mt-md">
                <q-select dense rounded outlined v-model="employee" :options="employeeOptions"
                  class="q-mr-sm text-h6 col-auto" />
                <q-select dense rounded outlined v-model="agency" :options="agencyOptions"
                  class="q-mr-sm text-h6 col-auto" />
                <q-select dense rounded outlined v-model="training" :options="trainingOptions"
                  class="q-mr-sm text-h6 col-auto" />
                <q-select dense rounded outlined v-model="links" :options="linksOptions"
                  class="q-mr-sm text-h6 col-auto" />
              </div>
            </q-card>
          </div>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col full-width">
        <q-card class="campaign-dailog-specific-width-form q-mt-md">
          <div class="campaign-border q-ma-sm">
            <label class="text-h6 text-subtitle2 text-grey">AUDIENCE</label>
            <label class="float-right campaign-nagitive-margin">
              <q-btn flat color="primary" class="campaign-filter-btn">Reset</q-btn>
              <q-btn-dropdown text-color="primary" label="Presets" flat class="campaign-filter-btn">
                <q-list>
                  <q-item clickable @click="audienceModal = true">
                    <q-item-section> Audience Preset </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </label>
            <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
              outlined dense class="q-mt-sm">
              <template v-slot:before>
                <label class="text-h6 campaign-label-form">Programs</label>
              </template>
            </q-select>

            <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
              outlined dense class="q-mt-sm">
              <template v-slot:before>
                <label class="text-h6 campaign-label-form">Signed up</label>
              </template>
            </q-select>

            <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
              outlined dense class="q-mt-sm">
              <template v-slot:before>
                <label class="text-h6 campaign-label-form">Progress range</label>
              </template>
            </q-select>

            <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
              outlined dense class="q-mt-sm">
              <template v-slot:before>
                <label class="text-h6 campaign-label-form">Progress status</label>
              </template>
            </q-select>

            <q-select use-input hide-selected fill-input input-debounce="0" option-value="id" option-label="label"
              outlined dense class="q-mt-sm">
              <template v-slot:before>
                <label class="text-h6 campaign-label-form">Days before due date</label>
              </template>
            </q-select>
            <div class="text-subtitle2 q-mt-md text-grey">
              (Estimated 198 Employees)
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col full-width">
        <q-card class="campaign-dailog-specific-width-form q-mt-md">
          <div class="campaign-border q-ma-sm">
            <label class="text-h6 text-subtitle2 text-grey"> WHEN </label>
            <label class="float-right campaign-nagitive-margin">
              <q-btn flat color="primary" class="campaign-filter-btn">Clear</q-btn>
              <q-btn-dropdown text-color="primary" label="Presets" flat class="campaign-filter-btn">
                <q-list>
                  <q-item clickable @click="scheduleModal = true">
                    <q-item-section> Schedule Preset </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </label>

            <div class="row full-width">
              <div class="col q-ml-sm">
                <label class="text-h6">From</label>
                <q-select outlined dense v-model="from" :options="fromOptions" />
              </div>
              <div class="col q-ml-sm">
                <label class="text-h6">At</label>
                <q-input outlined dense v-model="at" mask="time" :rules="['time']">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="at">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
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
                <q-select outlined dense v-model="every" :options="everyOptions" />
              </div>
              <div class="col q-ml-sm">
                <label class="text-h6">On</label>
                <div class="campaign-week-block">
                  <q-checkbox dense class="campaign-week-days-select" v-model="onSunday" true-value="sunday"
                    label="S" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onMonday" true-value="monday"
                    label="M" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onTuesday" true-value="tuesday"
                    label="T" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onWednesday" true-value="wednesday"
                    label="W" />

                  <q-checkbox dense class="campaign-week-days-select" v-model="onThursday" true-value="thursday"
                    label="T" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onFriday" true-value="friday"
                    label="F" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onSaturday" true-value="saturday"
                    label="S" />
                </div>
              </div>
            </div>
            <div class="row full-width">
              <div class="col q-ml-sm q-mt-sm">
                <label class="text-h6">Until</label>
                <q-select outlined dense v-model="until" :options="untilOptions" />
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
  <q-dialog v-model="audienceModal">
    <audience-presets-modal></audience-presets-modal>
  </q-dialog>
  <q-dialog v-model="messageModal">
    <message-presets-modal></message-presets-modal>
  </q-dialog>
  <q-dialog v-model="scheduleModal">
    <schedule-presets-modal></schedule-presets-modal>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from "vue";
import AudiencePresetsModal from "../Templates/AudiencePresetsModal.vue";
import MessagePresetsModal from "../Templates/MessagePresetsModal.vue";
import SchedulePresetsModal from "../Templates/SchedulePresetsModal.vue";
export default defineComponent({
  name: "TemplateForm",
  components: {
    AudiencePresetsModal,
    MessagePresetsModal,
    SchedulePresetsModal,
  },
  data() {
    return {
      title: "Sign up",
      tab: ref("english"),
      fromOptions: ["Today"],
      everyOptions: ["Week"],
      every: "Week",
      presetOptions: ["Presets"],
      presets: null,
      from: "Today",
      at: ref("10:56"),
      untilOptions: ["The end of the year"],
      until: "The end of the year",
      employeeOptions: ["Employee's details"],
      employee: "Employee's details",
      agencyOptions: ["Agency's details"],
      agency: "Agency's details",
      trainingOptions: ["Training Progress"],
      training: "Training Progress",
      linksOptions: ["Links"],
      links: "Links",
      signedupOptions: ["Both signed up and not signed up"],
      signedup: "Both signed up and not signed up",
      progressRangeOptions: ["0 - 100%"],
      progressRange: "0 - 100%",
      dueDateOptions: ["7 Days"],
      dueDate: "7 Days",
      onSunday: ref(null),
      onMonday: ref(null),
      onTuesday: ref(null),
      onWednesday: ref(null),
      onThursday: ref(null),
      onFriday: ref(null),
      onSaturday: ref(null),
      audienceModal: ref(false),
      messageModal: ref(false),
      scheduleModal: ref(false),
    };
  },
});
</script>
