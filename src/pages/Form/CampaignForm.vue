<template>
  <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" ref="form">
    <div class="">
      <div class="row q-col-gutter-xs">
        <div class="col-12 col-auto q-pa-none">
          <div class="campaign-border q-pa-md bg-white">
            <div class="text-h6 text-grey q-mb-sm">DETAILS</div>
            <label class="campaign-text-base text-grey-9">Name</label>
            <q-input outlined dense autofocus v-model="campaign_name" placeholder="Campaign Name"
              class="col-5 q-pb-none campaign-name" :error="isError && campaign_name == ''"
              error-message="Please enter name of campaign" no-error-icon />
            <q-card class="no-shadow q-pt-md">
              <div>
                <label class="campaign-text-base text-grey-9"> Message </label>
                <label class="float-right campaign-nagitive-margin--nine">
                  <q-select class="campaign-filter-btn campaign-no-outline campaign-text-tiny" dense outlined
                    no-bordered v-model="language" :options="languages" multiple map-options :lazy-rules="true"
                    :options-dense="true" input-debounce="0" @filter="filterFnLanguages" :option-disable="(opt) => (Object(opt) === opt ? opt.value === 'EN' : true)
                      " :display-value="'Languages'">
                    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                      <q-item v-bind="itemProps">
                        <q-item-section side>
                          <q-checkbox v-if="opt.value !== 'EN'" :model-value="selected"
                            @update:model-value="toggleOption(opt)" />
                          <q-checkbox v-else v-model="english" disable color="teal" />
                        </q-item-section>
                        <q-item-section>
                          {{ opt.label }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </label>
              </div>

              <div>
                <q-tabs no-caps align="left" narrow-indicator v-model="tab" dense class="campaign-q-tabs"
                  :class="$q.dark.isActive ? 'bg-grey-9' : ''">
                  <q-tab class="text-h6 q-pa-none q-mr-sm" v-for="tab in language" :key="tab.value" :label="tab.label"
                    :name="tab.value" />
                </q-tabs>
                <q-tab-panels keep-alive v-model="tab">
                  <q-tab-panel v-for="tab in language" :key="tab.value" :name="tab.value" class="q-pa-none">
                    <textarea class="campaign-message-box" placeholder="Write a message Here" cols="33" :class="!messageLanguage[tab.value] && isError
                      ? 'has-error'
                      : ''
                      " v-model="messageLanguage[tab.value]" @input="countWords"></textarea>
                    <p v-if="wordCount <= 160" class="float-right text-h6">
                      {{ wordCount }}/ 160
                    </p>
                    <p v-if="wordCount > 160" class="campaign-has-error float-right text-h6">
                      {{ wordCount }}/ 160
                    </p>
                    <p v-if="!messageLanguage[tab.value] && isError" class="campaign-has-error">
                      {{ tab.label }} message is required
                    </p>
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </q-card>
          </div>
          <div class="q-mt-lg q-pa-md campaign-border bg-white">
            <label class="text-h6 text-subtitle2 text-grey"> AUDIENCE</label>
            <label class="float-right campaign-nagitive-margin">
              <q-btn @click="audienceClear" flat color="primary"
                class="campaign-filter-btn q-pa-none q-mr-sm">Clear</q-btn>
            </label>
            <div class="row full-width">
              <div class="col q-ml-sm">
                <div class="campaign-text-base text-grey-9">Programs</div>
                <q-select class="q-pb-none campaign-custom-valid" outlined dense v-model="program" :options="programs"
                  multiple :emit-value="false" map-options :lazy-rules="true" use-input input-debounce="0"
                  @filter="filterFn" :error="isError && program.length == 0" error-message="Program is required"
                  no-error-icon>
                  <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                    <q-item v-bind="itemProps">
                      <q-item-section side>
                        <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
                      </q-item-section>
                      <q-item-section>
                        {{ opt.label }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col q-ml-sm">
                <div class="campaign-text-base text-grey-9">Signed up</div>
                <q-select class="q-pb-none" outlined dense v-model="signedup" :options="signedups"
                  :rules="[(val) => !!val || 'Select your signedup']" :lazy-rules="true" option-label="label"
                  option-value="value" input-debounce="0" emit-value map-options />
              </div>
            </div>
            <div class="row full-width">
              <div class="col q-ml-sm">
                <div class="campaign-text-base text-grey-9 q-mt-fourteen">
                  Progress range
                </div>
                <q-select class="q-pb-none" outlined dense v-model="progressRange" :options="progressRanges"
                  option-label="label" option-value="value" input-debounce="0" emit-value map-options />
                <q-range v-if="progressRange == 'range'" :left-label-value="progressRangeSet.min + '%'"
                  :right-label-value="progressRangeSet.max + '%'" v-model="progressRangeSet" label-always
                  switch-label-side color="secondary" track-size="8px" class="q-pb-none" />
              </div>
              <div class="col q-ml-sm">
                <div class="campaign-text-base text-grey-9 q-mt-fourteen">
                  Days before due date
                </div>
                <q-select outlined dense v-model="dueDate" :options="dueDateOptions"
                  :rules="[(val) => !!val || 'Select your signedup']" :lazy-rules="true" option-label="label"
                  option-value="value" input-debounce="0" emit-value map-options class="q-pb-none" />
              </div>
            </div>
          </div>
          <div class="q-pa-md campaign-border q-mt-lg bg-white">
            <label class="text-h6 text-subtitle2 text-grey"> SCHEDULE </label>
            <label class="float-right campaign-nagitive-margin">
              <q-btn @click="scheduleClear" flat color="primary" class="campaign-filter-btn q-pa-none q-mr-sm"
                type="reset">Clear</q-btn>
            </label>
            <div class="row full-width">
              <div class="col">
                <label class="campaign-text-base text-grey-9">Every</label>
                <q-select outlined dense v-model="every" :options="everyOptions"
                  :rules="[(val) => !!val || 'Select your Every']" :lazy-rules="true" option-label="label"
                  option-value="value" input-debounce="0" emit-value map-options class="q-pb-none" />
              </div>
              <div class="col q-ml-sm" v-if="every == 'week'">
                <label class="campaign-text-base text-grey-9">On</label>
                <div class="campaign-week-block" :class="onErrorMsg && weekDaysError
                  ? 'campaign-message-box-has-error'
                  : ''
                  " @click="weekDaysErrorCheck">
                  <q-checkbox @click="weekDaysErrorCheck" dense class="campaign-week-days-select" v-model="onSunday"
                    true-value="sunday" label="S" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onMonday" true-value="monday" label="M"
                    @click="weekDaysErrorCheck" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onTuesday" true-value="tuesday" label="T"
                    @click="weekDaysErrorCheck" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onWednesday" true-value="wednesday"
                    label="W" @click="weekDaysErrorCheck" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onThursday" true-value="thursday"
                    label="T" @click="weekDaysErrorCheck" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onFriday" true-value="friday" label="F"
                    @click="weekDaysErrorCheck" />
                  <q-checkbox dense class="campaign-week-days-select" v-model="onSaturday" true-value="saturday"
                    label="S" @click="weekDaysErrorCheck" />
                </div>
                <div v-if="onErrorMsg && weekDaysError" class="q-field__bottom row items-start">
                  <div class="q-field__messages col campaign-has-error">
                    <div role="alert">{{ onErrorMsg }}</div>
                  </div>
                  <!---->
                </div>
                <!-- error every -->
              </div>
              <div class="col q-ml-sm" v-if="every == 'month'">
                <label class="text-h6">On</label>
                <div class="row">
                  <q-select outlined dense v-model="onWeekNo" :options="onWeekNos" class="col-5 q-mr-sm"
                    option-label="label" option-value="value" input-debounce="0" emit-value map-options
                    :error="isError && !onWeekNo" error-message="Please select Time" no-error-icon />
                  <q-select outlined dense v-model="onWeekDay" :options="onWeekDays" class="col-6" option-label="label"
                    option-value="value" input-debounce="0" emit-value map-options :error="isError && !onWeekDay"
                    error-message="Please select week" no-error-icon />
                </div>
              </div>
              <div class="col q-ml-sm" v-if="every == 'bi-weekly'">
                <label class="text-h6">On</label>
                <div class="row">
                  <q-select outlined dense v-model="onWeekNo" :options="onWeekMonthNos" class="col-5 q-mr-sm"
                    option-label="label" option-value="value" input-debounce="0" emit-value map-options
                    :error="isError && !onWeekNo" error-message="Please select Time" no-error-icon />
                  <q-select outlined dense v-model="onWeekDay" :options="onDays" class="col-6" option-label="label"
                    option-value="value" input-debounce="0" emit-value map-options :error="isError && !onWeekDay"
                    error-message="Please select week" no-error-icon />
                </div>
              </div>
            </div>
            <div class="row full-width q-ma-none q-pt-md">
              <div class="col">
                <label class="campaign-text-base text-grey-9">Time</label>
                <q-input outlined dense v-model="time" mask="time" :lazy-rules="true" class="q-pb-none"
                  :error="isError && time == ''" error-message="Please select time" no-error-icon>
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="time">
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
            <div class="row full-width q-mt-md q-ma-none">
              <div class="col">
                <label class="campaign-text-base text-grey-9">Frequency restriction</label>
                <q-select outlined dense v-model="day" :options="days" :lazy-rules="true" :rules="[
                  (val) =>
                    (val != null && val != null) ||
                    'Select your Frequency restriction',
                ]" option-label="label" option-value="value" input-debounce="0" emit-value map-options>
                  <template v-slot:before>
                    <label class="campaign-text-base-thin text-grey-9">Not more than once every</label>
                  </template>
                </q-select>
              </div>
            </div>
          </div>
          <div class="q-pa-md campaign-border q-mt-lg bg-white">
            <label class="text-h6 text-subtitle2 text-grey"> ACTIVATION </label>
            <label class="float-right campaign-nagitive-margin">
              <q-btn @click="ActivationClear" flat color="primary"
                class="campaign-filter-btn q-pa-none q-mr-sm">Clear</q-btn>
            </label>
            <div class="row full-width q-pt-sm q-pb-sm">
              <div class="col">
                <label class="campaign-text-base text-grey-9">Start - End</label>
                <q-input class="q-pb-none" outlined dense :model-value="`${dateRange && dateRange.from ? dateRange.from : ''
                  } - ${dateRange && dateRange.to ? dateRange.to : ''}`" :error="isError &&
                    (dateRange.from.length == 0 || dateRange.to.length == 0)
                    " error-message="Select your start to until date" no-error-icon>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="dateRange" range>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useAgencyStore } from "../../stores/agency";
import { Notify } from "quasar";
const agency = useAgencyStore();

export default defineComponent({
  name: "CampaignForm",
  props: {
    campaign: {
      type: Array,
      default: null,
    },
    closeModal: { type: Function },
  },
  data() {
    return {
      wordCount: 0,
      wordCountObj: {},
      english: true,
      agencyObj: agency.agency,
      campaign_name: "",
      tab: ref("EN"),
      messageLanguage: ref({}),
      everyOptions: [
        { label: "Week", value: "week" },
        { label: "Bi-weekly", value: "bi-weekly" },
        { label: "Month", value: "month" },
      ],
      every: "week",
      onWeekDay: "",
      onWeekDays: [
        { label: "Day", value: "day" },
        { label: "Work Day", value: "work_day" },
        { label: "Sunday", value: "sunday" },
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednsday", value: "wednsday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
      ],
      onDays: [
        { label: "Sunday", value: "sunday" },
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednsday", value: "wednsday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
      ],
      onWeekNo: "",
      onWeekNos: [
        { label: "First", value: "1" },
        { label: "Second", value: "2" },
        { label: "Third", value: "3" },
        { label: "Fourth", value: "4" },
        { label: "Last", value: "5" },
      ],
      onWeekMonthNos: [
        { label: "1st - 3rd week", value: "1" },
        { label: "2nd - 4th week", value: "2" },
      ],
      time: "09:00",
      onErrorMsg: null,
      onSunday: ref(""),
      onMonday: ref(""),
      onTuesday: ref(""),
      onWednesday: ref(""),
      onThursday: ref(""),
      onFriday: ref(""),
      onSaturday: ref(""),
      days: [
        { label: "1 Day", value: "1" },
        { label: "2 Day", value: "2" },
        { label: "3 Day", value: "3" },
        { label: "4 Day", value: "4" },
        { label: "5 Day", value: "5" },
        { label: "6 Day", value: "6" },
        { label: "7 Day", value: "7" },
        { label: "8 Day", value: "8" },
      ],
      day: "1",
      programOptions: [],
      programs: this.programOptions,
      program: ref([]),
      languageOptions: [],
      languages: this.languageOptions,
      language: ref([{ value: "EN", label: "English (Default)" }]),
      signedups: [
        { label: "Any", value: "1" },
        { label: "Signed Up", value: "2" },
        { label: "Not Signed Up", value: "3" },
      ],
      signedup: "1",
      progressRanges: [
        { label: "Any", value: "any" },
        { label: "Range", value: "range" },
      ],
      progressRangeSet: ref({
        min: 10,
        max: 99,
      }),
      progressRange: "any",
      dueDateOptions: [
        { label: "Any", value: "-1" },
        { label: "1 Day", value: "1" },
        { label: "3 Days", value: "3" },
        { label: "7 Days", value: "7" },
        { label: "14 Days", value: "14" },
        { label: "21 Days", value: "21" },
        { label: "1 Month", value: "30" },
      ],
      dueDate: "-1",
      dateRange: ref({ to: "", from: "" }),
      isError: false,
      weekDaysError: false,
    };
  },
  created() {
    this.getlanguage();
    this.getPrograms();
  },
  watch: {
    campaign(val) {
      this.campaign_name = val.title;
      this.messageLanguage["EN"] = val.default_message;
      this.wordCount = this.messageLanguage["EN"].length;
      this.wordCountObj[this.tab] = this.messageLanguage["EN"].length;
      if (val.messages) {
        val.messages.forEach((message) => {
          this.language.push({
            value: message.language_code,
            label: message.language_name,
          });
          this.messageLanguage[message.language_code] = message.message;
        });
      }

      if (val.programs) {
        // this.program = {
        //   value: val.programs[0].program_id,
        //   label: val.programs[0].program_name,
        // };
        val.programs.forEach((program) => {
          this.program.push({
            value: program.program_id,
            label: program.program_name,
          });
        });
      }

      if (val.programFilter) {
        this.signedup = val.programFilter.signed_up;
        this.dueDate = val.programFilter.days_before_due_date;
        this.progressRange = val.programFilter.progress_range;
        if (val.programFilter.progress_range == "range") {
          this.progressRangeSet.min = val.programFilter.progress_range_min;
          this.progressRangeSet.max = val.programFilter.progress_range_max;
        }
      }

      if (val.schedule) {
        this.every = val.schedule.every;
        this.time = val.schedule.time;
        this.dateRange.from = val.schedule.start_date;
        this.dateRange.to = val.schedule.end_date;
      }

      if (val.schedule.on && val.schedule.every == "week") {
        let weekDays = JSON.parse(val.schedule.on);
        weekDays.forEach((day) => {
          if (day == "sunday") {
            this.onSunday = day;
          }

          if (day == "monday") {
            this.onMonday = day;
          }

          if (day == "tuesday") {
            this.onTuesday = day;
          }

          if (day == "wednesday") {
            this.onWednesday = day;
          }

          if (day == "thursday") {
            this.onThursday = day;
          }

          if (day == "friday") {
            this.onFriday = day;
          }

          if (day == "saturday") {
            this.onSaturday = day;
          }
        });
      } else if (val.schedule.on && val.schedule.every == "month") {
        let weekDays = JSON.parse(val.schedule.on);
        this.onWeekNo = weekDays["week_number"];
        this.onWeekDay = weekDays["week_day"];
      } else if (val.schedule.on && val.schedule.every == "bi-weekly") {
        let weekDays = JSON.parse(val.schedule.on);
        this.onWeekNo = weekDays["week_number"];
        this.onWeekDay = weekDays["week_day"];
      }
      this.day = val.schedule.frequency_restriction;
    },
    tab(val) {
      this.wordCount = 0;
      for (var key in this.wordCountObj) {
        if (key == val) this.wordCount = this.wordCountObj[key];
      }
    },
  },
  methods: {
    countWords() {
      this.wordCountObj[this.tab] = this.messageLanguage[this.tab].length;
      this.wordCount = this.messageLanguage[this.tab].length;
    },
    weekDaysErrorCheck() {
      if (
        this.every == "week" &&
        (this.onSunday ||
          this.onMonday ||
          this.onTuesday ||
          this.onWednesday ||
          this.onThursday ||
          this.onFriday ||
          this.onSaturday)
      ) {
        this.weekDaysError = false;
      } else {
        this.weekDaysError = true;
      }
    },
    getlanguage() {
      this.$api
        .get("/languages")
        .then((response) => {
          if (response && response.data && response.data.data) {
            let languages = response.data.data;
            languages.forEach((element) => {
              this.languageOptions.push({
                value: element.code,
                label: element.name,
              });
            });
          }
        })
        .catch(function (error) { });
    },
    getPrograms() {
      if (this.agencyObj && this.agencyObj.id > 0) {
        this.$api
          .get("/agencies/" + this.agencyObj.id + "/courses")
          .then((response) => {
            if (response && response.data && response.data.data) {
              let programs = response.data.data;
              programs.forEach((element) => {
                this.programOptions.push({
                  value: element.id,
                  label: element.name,
                });
              });
            }
          })
          .catch(function (error) { });
      }
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.programs = this.programOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.programs = this.programOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterFnLanguages(val, update) {
      if (val === "") {
        update(() => {
          this.languages = this.languageOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.languages = this.languageOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    onReset() {
      this.campaign_name = null;
      this.message = null;
    },
    audienceClear() {
      this.program = [];
      this.signedup = "1";
      this.progressRange = "any";
      this.dueDate = "-1";
    },
    scheduleClear() {
      this.every = "week";
      this.time = "09:00";
      this.day = "1";
    },
    ActivationClear() {
      this.dateRange.to = "";
      this.dateRange.from = "";
    },
    onSubmit() {
      if (agency.agency && !agency.agency.id) {
        return Notify.create({
          type: "negative",
          message: "Must need to select agency",
        });
      }

      if (
        this.every == "week" &&
        (this.onSunday ||
          this.onMonday ||
          this.onTuesday ||
          this.onWednesday ||
          this.onThursday ||
          this.onFriday ||
          this.onSaturday)
      ) {
        this.weekDaysError = false;
        this.isError = false;
        this.onErrorMsg = "";
      } else if (
        this.every == "week" &&
        (!this.onSunday ||
          !this.onMonday ||
          !this.onTuesday ||
          !this.onWednesday ||
          !this.onThursday ||
          !this.onFriday ||
          !this.onSaturday)
      ) {
        this.isError = true;
        this.weekDaysError = true;
        this.onErrorMsg = "Please select week days";
      } else if (
        this.every &&
        this.every.value == "month" &&
        (!this.onWeekNo || !this.day)
      ) {
        this.onErrorMsg = "Please select on time and day";
        this.isError = true;
      } else if (this.every == "month" && this.onWeekNo && this.day) {
        this.isError = false;
        this.weekDaysError = false;
      }

      if (Object.values(this.messageLanguage).length === 0) {
        this.isError = true;
      }

      if (!this.campaign_name) {
        this.isError = true;
      }

      if (this.program.length == 0) {
        this.isError = true;
      }

      if (this.dateRange.from == "") {
        this.isError = true;
      }

      if (this.dateRange.to == "") {
        this.isError = true;
      }

      if (this.time == "") {
        this.isError = true;
      }

      if (this.isError) {
        Notify.create({
          type: "negative",
          message: "Please provide valid inputs",
        });
      } else {
        this.onErrorMsg = null;
        this.isError = false;
        let formData = new FormData();
        formData.append("name", this.campaign_name);

        formData.append(
          "default_message",
          JSON.stringify(this.messageLanguage)
        );

        formData.append("language", JSON.stringify(this.language));

        formData.append("default_message_language", this.tab);
        // audience
        formData.append("audience_programs", JSON.stringify(this.program));
        formData.append("audience_signedup", this.signedup);
        formData.append("audience_progress_range_type", this.progressRange);
        formData.append(
          "audience_progress_range_number",
          JSON.stringify(this.progressRangeSet)
        );
        formData.append("audience_due_date", this.dueDate);
        // schedule
        formData.append("schedule_every", this.every);
        formData.append("schedule_on_sunday", this.onSunday);
        formData.append("schedule_on_monday", this.onMonday);
        formData.append("schedule_on_tuesday", this.onTuesday);
        formData.append("schedule_on_wednesday", this.onWednesday);
        formData.append("schedule_on_thursday", this.onThursday);
        formData.append("schedule_on_friday", this.onFriday);
        formData.append("schedule_on_saturday", this.onSaturday);
        formData.append("schedule_on_week_number", this.onWeekNo);
        formData.append("schedule_on_week_day", this.onWeekDay);
        formData.append("schedule_time", this.time);
        formData.append("schedule_day", this.day);
        //Activation
        formData.append("activation_from", this.dateRange.from);
        formData.append("activation_to", this.dateRange.to);
        formData.append("organization_id", agency.agency.id);
        formData.append("organization_name", agency.agency.name);
        let url = "/campaigns";
        if (this.campaign && this.campaign.id) {
          url = "/campaigns/" + this.campaign.id;
        }
        this.$loading.show();
        this.$api
          .post(url, formData)
          .then((response) => {
            let msg = "Campaigns created";
            if (this.campaign && this.campaign.id) {
              msg = "Campaigns updated";
            }
            Notify.create({
              type: "positive",
              message: msg,
            });

            this.closeModal();
            this.$loading.hide();
          })
          .catch((err) => {
            this.$loading.hide();
            if (err.response.data.data) {
              let errors = err.response.data.data;
              if (errors) {
                for (const error in errors) {
                  Notify.create({
                    type: "negative",
                    message: errors[error],
                  });
                }
              }
            }
          });
      }
    },
  },
});
</script>
