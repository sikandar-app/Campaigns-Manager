<template>
  <div>
    <q-btn
      icon="o_home"
      icon-right="expand_more"
      flat
      text-color="white"
      color="#005f64"
      align="right"
      class="btn-fixed-width btn--no-hover q-px-sm"
      :label="agency.name"
      style="
        min-width: 250px;
        max-width: 500px;
        overflow: hidden;
        white-sapce: nowrap;
      "
      @click="openAgencyBox"
    >
      <q-menu
        transition-show="jump-down"
        transition-hide="jump-up"
        anchor="bottom right"
        self="top right"
      >
        <q-select
          ref="selectedAgency"
          dense
          filled
          style="width: 350px"
          class="text-black border-white-0 no-shadow custom-no-shadow"
          v-model="selectedAgency"
          :options="agenciesOptions"
          option-value="id"
          option-label="name"
          @filter="filterAgencies"
          use-input
          input-debounce="3"
          :autofocus="true"
          behavior="menu"
        >
          <template v-slot:prepend>
            <q-icon name="search" class="text-black" />
          </template>
          <template v-slot:before-options v-if="recentAgencies.length > 0">
            <q-item-label class="ml-5 text-h6" header
              >Recently Viewed</q-item-label
            >

            <q-list>
              <q-item v-for="agency in recentAgencies" :key="agency.id">
                <q-item-section
                  @click="recentlyViewedAgency(agency)"
                  class="recentViewedList"
                >
                  <q-item-label class="text-black">
                    {{ agency.name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-item-label class="ml-5 text-h6" header>All</q-item-label>
          </template>
          <template v-slot:option="scope">
            <q-list>
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label class="text-black">
                    {{ scope.opt.name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-select>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { useAgencyStore } from "../stores/agency";
import { mapState, mapActions } from "pinia";
import { ref } from "vue";

export default {
  watch: {
    selectedAgency(val) {
      this.redirectSelectedOrg(val);
    },
  },
  data() {
    return {
      selectedAgency: ref(null),
      agenciesOptions: ref([]),
    };
  },
  computed: {
    ...mapState(useAgencyStore, [
      "agency",
      "agencies",
      "recentAgencies",
      "getAgency",
      "getAgencies",
    ]),
  },
  mounted() {
    this.fetchAgencies();
    this.fetchRecentAgencies();
  },
  methods: {
    ...mapActions(useAgencyStore, [
      "setAgency",
      "fetchAgencies",
      "fetchRecentAgencies",
    ]),
    filterAgencies(val, update, abort) {
      if (val == "") {
        update(() => {
          this.agenciesOptions = this.agencies;
        });
        return;
      }
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.agenciesOptions = this.agencies.filter(
          (v) => v.name.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },
    openAgencyBox() {
      setTimeout(() => {
        this.$refs.selectedAgency.showPopup();
        this.$refs.selectedAgency.setOptionIndex(0);
      }, 320);
    },
    redirectSelectedOrg(val) {
      var agency = this.agency;

      this.setAgency(val);
      if (agency.id != val.id) {
        this.$router
          .push({
            name: this.$router.currentRoute.name,
            params: { agency_id: val.id },
          })
          .then(() => {
            this.$router.go();
          });
      }
    },
    recentlyViewedAgency(agency) {
      this.agency = agency;
      this.redirectSelectedOrg(agency);
      this.$refs.selectedAgency.hidePopup();
    },
  },
};
</script>
<style scoped>
.q-focus-helper {
  display: none;
}
.q-btn__content {
  flex-wrap: nowrap;
}
</style>
