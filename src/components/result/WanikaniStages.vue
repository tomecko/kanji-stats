<script>
import { mixins, Pie } from 'vue-chartjs';

import { INDEPENDENTLY_LEARNED } from '../../global';
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
          display: false,
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'by WaniKani Stages',
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
      const stagesExtended = this.stages.concat(INDEPENDENTLY_LEARNED);
      return {
        datasets: [{
          backgroundColor: stagesExtended.map(getStageColor),
          data: this.stages
            .map(stage => this.kanjiByStages[stage]
              ? this.kanjiByStages[stage]
                .filter(kanji => !this.independentlyLearnedFoundKanji.includes(kanji))
                .length
              : 0)
            .concat(this.independentlyLearnedFoundKanji.length),
        }],
        labels: stagesExtended,
      };
    },
  },
  props: {
    foundKanji: Array,
    independentlyLearnedFoundKanji: Array,
    kanjiByStages: Object,
    stages: Array,
  },
  watch: {
    independentlyLearnedFoundKanji() {
      this.chartData = this.getChartData();
    },
    kanjiByStages() {
      this.chartData = this.getChartData();
    },
  },
};
</script>
