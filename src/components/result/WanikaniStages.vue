<script>
import { groupBy } from 'lodash';
import { Pie, mixins } from 'vue-chartjs';

import { WANIKANI_STAGES } from '../../global';
import { formatPercent } from '../../helpers';

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
          display: false,
        },
        tooltips: {
          callbacks: {
            label: ({ index: i }, all) => {
              const dataset = all.datasets[0];
              const count = dataset.data[i];
              const total = dataset.data.reduce((acc, val) => acc + val);
              return `${all.labels[i]}: ${formatPercent(count / total)} (${count} kanji out of ${total})`;
            },
          },
        },
      },
    };
  },
  methods: {
    getChartData() {
      const groupedKanji = groupBy(
        this.foundKanji,
        kanji => this.kanjiInfo[kanji] === undefined ? null : this.kanjiInfo[kanji].srsStageName,
      );
      return {
        datasets: [{
          backgroundColor: this.srsStages
          // eslint-disable-next-line camelcase
            .map(({ srs_stage_name }) => srs_stage_name.split(' ')[0].toUpperCase())
            .map(stage => WANIKANI_STAGES[stage])
            .concat('#ddd'),
          data: this.srsStages
            // eslint-disable-next-line camelcase
            .map(({ srs_stage_name }) => groupedKanji[srs_stage_name]
              ? groupedKanji[srs_stage_name].length
              : 0)
            .concat(groupedKanji.null.length),
        }],
        // eslint-disable-next-line camelcase
        labels: this.srsStages.map(({ srs_stage_name }) => srs_stage_name).concat('unlocked'),
      };
    },
  },
  props: {
    foundKanji: Array,
    kanjiInfo: Object,
    srsStages: Array,
  },
  watch: {
    kanjiInfos() {
      this.chartData = this.getChartData();
    },
  },
};
</script>
