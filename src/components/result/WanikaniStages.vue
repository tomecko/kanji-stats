<script>
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
      return {
        datasets: [{
          backgroundColor: this.stages.map(getStageColor),
          data: this.stages.map(stage => this.kanjiByStages[stage]
            ? this.kanjiByStages[stage].length
            : 0),
        }],
        labels: this.stages,
      };
    },
  },
  props: {
    foundKanji: Array,
    kanjiByStages: Object,
    stages: Array,
  },
  watch: {
    kanjiInfos() {
      this.chartData = this.getChartData();
    },
  },
};
</script>
