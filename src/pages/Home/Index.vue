<template>
  <div class="q-pa-lg">
    <p class="text-h1">Hello {{ userLabel }} 👋</p>
    <div class="row q-gutter-md">
      <div class="col">
        <StatsCard :label="'Sent'" :value="5124"></StatsCard>
      </div>
      <div class="col">
        <StatsCard :label="'Delivered'" :value="5124"></StatsCard>
      </div>
      <div class="col">
        <StatsCard :label="'Not Delivered'" :value="5124"></StatsCard>
      </div>
      <div class="col">
        <StatsCard :label="'Opened'" :value="5124"></StatsCard>
      </div>
      <div class="col">
        <StatsCard :label="'Failed'" :value="5124"></StatsCard>
      </div>
      <div class="col">
        <StatsCard :label="'Bad Number'" :value="5124"></StatsCard>
      </div>
    </div>
    <div class="row q-gutter-md q-mt-md">
      <div class="col">
        <StatsChart title="Signed up from link"></StatsChart>
      </div>
      <div class="col">
        <StatsChart title="Trained the day they notified"></StatsChart>
      </div>
    </div>
  </div>
</template>

<script>
import StatsCard from "./StatsCard.vue";
import StatsChart from "./StatsChart.vue";
import { useAuthStore } from "../../stores/auth";
import { useAgencyStore } from "../../stores/agency";
import { mapState } from "pinia";

const auth = useAuthStore();

export default {
  components: {
    StatsCard,
    StatsChart,
  },
  computed: {
    ...mapState(useAgencyStore, ["agency"]),
    userLabel() {
      return auth.user && auth.user.name ? auth.user.name : "Admin";
    },
  },
  created() {
    if (this.agency && this.agency.id) {
      this.$router.push({
        name: "campaigns",
        params: { agency_id: this.agency.id },
      });
    } else {
      this.$router.push({ name: "campaigns" });
    }
  },
};
</script>
