<template>
  <q-card flat bordered class="nv-card">
    <q-card-section class="q-pa-sm">
      <div class="row justify-between">
        <div class="text-h4">{{ title }}</div>
        <div class="text-h4">+60%</div>
      </div>
      <div class="row">
        <q-card-section class="q-pa-none echarts">
          <IEcharts :option="barChartOption" :resizable="true" />
        </q-card-section>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import IEcharts from "vue3-echarts-v3/src/full.js";
import "echarts/lib/chart/line";

export default {
  name: "charts",
  props: ["title"],
  data() {
    return {
      barChartOption: {
        xAxis: {
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            data: [55, 72, 84, 48, 59, 62, 87],
          },
        ],
        title: {
          x: "center",
          textStyle: {
            fontSize: 100,
          },
        },
        color: ["#26AAA7"],
      },
    };
  },
  components: {
    IEcharts,
  },
};
</script>
<style scoped>
.echarts {
  width: 332px;
  height: 400px;
}
</style>
