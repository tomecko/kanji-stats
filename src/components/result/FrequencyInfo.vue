<template>
  <section>
    <h2>Kanji frequency</h2>
    <div class="charts">
      <FrequencyLineChart
        class="chart"
        :height="400"
        :kanjiInfos="kanjiInfos"
        :showCount="showCount"
      />
      <FrequencyBarChart
        class="chart"
        :height="400"
        :kanjiInfos="kanjiInfos"
        :showCount="showCount"
      />
    </div>
  </section>
</template>

<script>
import FrequencyBarChart from './FrequencyBarChart.vue';
import FrequencyLineChart from './FrequencyLineChart.vue';

export default {
  name: 'FrequencyInfo',
  components: { FrequencyBarChart, FrequencyLineChart },
  props: {
    kanjiInfos: Array,
    showCount: Number,
  },
};
</script>

<style scoped lang="scss">
.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .chart {
    margin-bottom: 50px;
    width: 46%;
    @media (max-width: 1100px) {
      width: 100%;
    }
  }
}
</style>
