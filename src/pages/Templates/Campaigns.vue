<template>
  <div>
    <template-grid
      v-if="campaigns && isTableView == 0"
      :campaigns="campaigns"
    ></template-grid>
    <template-table
      v-else-if="campaigns && isTableView == 1"
      :campaigns="campaigns"
    ></template-table>
  </div>
</template>
<script>
import TemplateGrid from "./TemplateGrid.vue";
import TemplateTable from "./TemplateTable.vue";
export default {
  name: "OperationalCampaigns",
  components: {
    TemplateGrid,
    TemplateTable,
  },
  data() {
    return {
      campaigns: [
        {
          id: 972,
          title: "Sign up Regular",
          days: "Tue, Wed, Fri",
          time: "12:30 PM",
          audience_count: 298,
          days_left: 90,
        },
        {
          id: 973,
          title: "Sign up HHAX",
          days: "Mon",
          time: "10:00 AM",
          audience_count: 1540,
          days_left: 5,
        },
        {
          id: 974,
          title: "Weekly Reminder",
          days: "Last work day of the month",
          time: "02:00 PM",
          audience_count: 21578,
          days_left: 90,
        },
        {
          id: 975,
          title: "Weekly Summary",
          days: "Tue, Wed, Fri",
          time: "02:30 PM",
          audience_count: 298,
          days_left: 0,
        },
        {
          id: 976,
          title: "Monthly summary",
          days: "Tue, Wed, Fri",
          time: "02:30 PM",
          audience_count: 298,
          days_left: 0,
        },
        {
          id: 977,
          title: "Due Soon",
          days: "Everyday",
          time: "02:00 AM",
          audience_count: 298,
          days_left: 0,
        },
      ],
    };
  },
  computed: {
    isTableView() {
      return this.$route.query.tableView
        ? parseInt(this.$route.query.tableView)
        : 0;
    },
  },
};
</script>
