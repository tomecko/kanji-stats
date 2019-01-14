<script>
import { groupBy } from 'lodash';
import { mixins, Pie } from 'vue-chartjs';

import { formatPercent, getStageColor } from '../../helpers';

export default {
  name: 'WanikaniStages',
  extends: Pie,
  mixins: [mixins.reactiveData],
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
  data() {
    return {
      chartData: this.getChartData(),
      chartOptions: {
        cutoutPercentage: 60,
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Wanikani Stages',
        },
        tooltips: {
          callbacks: {
            label: ({ index: i }, all) => {
              const dataset = all.datasets[0];
              const count = dataset.data[i];
              const total = dataset.data.reduce((acc, val) => acc + val);
              return ` ${all.labels[i]}: ${formatPercent(count / total)} (${count} kanji out of ${total})`;
            },
          },
        },
      },
    };
  },
  methods: {
    getChartData() {
      const NOT_ON_WANIKANI = 'not on WaniKani';
      const groupedKanji = groupBy(
        this.foundKanji,
        kanji => this.wanikani.kanjiInfos[kanji] === undefined
          ? NOT_ON_WANIKANI
          : this.wanikani.kanjiInfos[kanji].srsStageName,
      );
      return {
        datasets: [{
          backgroundColor: this.wanikani.srsStages
            .map(getStageColor)
            .concat('#ddd')
            .concat('#aaa'),
          data: this.wanikani.srsStages
            // eslint-disable-next-line camelcase
            .map(({ srs_stage_name }) => groupedKanji[srs_stage_name]
              ? groupedKanji[srs_stage_name].length
              : 0)
            .concat(groupedKanji[undefined].length)
            .concat(groupedKanji[NOT_ON_WANIKANI].length),
        }],
        labels: this.wanikani.srsStages
          // eslint-disable-next-line camelcase
          .map(({ srs_stage_name }) => srs_stage_name)
          .concat('Unlocked')
          .concat(NOT_ON_WANIKANI),
      };
    },
  },
  props: {
    foundKanji: Array,
    wanikani: Object,
  },
  watch: {
    kanjiInfos() {
      this.chartData = this.getChartData();
    },
  },
};
</script>
