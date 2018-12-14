<template>
  <GChart
    :data="chartData"
    :options="{
      backgroundColor: 'transparent',
      chartArea: {
        left: 70, top: 10, height: '80%', width: '88%',
      },
      height: 300,
      legend: { position: 'none' },
      hAxis: { gridlines: { count: 0 }, title: '# of kanji sorted by frequency' },
      series: { 0: { color: '#e26f6f', lineWidth: 3 } },
      vAxis: { format: 'percent', title: '% of kanji in the text' },
    }"
    class="chart"
    type="LineChart"
  />
</template>

<script>
import { GChart } from 'vue-google-charts';

export default {
  name: 'Chart',
  components: {
    GChart,
  },
  computed: {
    chartData() {
      return [[{ type: 'number' }, { type: 'number' }, { role: 'tooltip' }]]
        .concat(this.kanjiInfos.map((info, i) => [
          i + 1,
          info.foundAccPercentage,
          `${i + 1} most frequent kanji
          correspond to ${(info.foundAccPercentage * 100).toFixed(1)}% of unique kanji
          in the provided text.`,
        ]));
    },
  },
  props: {
    kanjiInfos: Array,
  },
};
</script>

<style lang="scss">
.chart {
  [id^="google-visualization-errors"] {
    display: none;
  }
}
</style>
<style scoped lang="scss">
.chart {
  height: 302px;
  margin-bottom: 30px;
}
</style>
