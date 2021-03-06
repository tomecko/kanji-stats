<script>
import { Line, mixins } from 'vue-chartjs';

import { PRIMARY, SECONDARY } from '../../global';

export default {
  name: 'FrequencyLineChart',
  extends: Line,
  mixins: [mixins.reactiveData],
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
  data() {
    return {
      chartData: this.getChartData(),
      chartOptions: {
        elements: {
          point: {
            hitRadius: 10,
            radius: 0,
          },
        },
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              fontSize: 16,
              labelString: '# of all kanji sorted by frequency',
            },
            ticks: {
              min: 0,
              max: this.showCount,
              stepSize: 100,
            },
            type: 'linear',
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              fontSize: 16,
              labelString: '% of kanji in your text',
            },
            ticks: {
              callback: value => `${value * 100}%`,
              min: 0,
              max: 1,
            },
            type: 'linear',
          }],
        },
        title: {
          display: true,
          text: 'Cumulative Frequency',
        },
        tooltips: {
          axis: 'x',
          callbacks: {
            label: () => false,
            title: points => points.length > 0
              ? `To know ${Math.round(points[0].yLabel * 100)}% of kanji
in the provided text
you need to be familiar
with the ${points[0].xLabel + 1} most frequent kanji.`
              : '',
          },
          caretPadding: 10,
          displayColors: false,
          filter: (point, data) => point.yLabel !== data.datasets[0].data[point.index - 1].y,
          mode: 'index',
          titleMarginBottom: 0,
        },
      },
    };
  },
  methods: {
    getChartData() {
      return {
        datasets: [{
          backgroundColor: SECONDARY,
          borderColor: PRIMARY,
          borderWidth: 5,
          data: this.kanjiInfos
            .map((info, i) => ({
              x: i,
              y: info.foundAccPercentage,
            }))
            .filter((_, i, all) => i === 0 || i === all.length - 1
              || i % 10 === 9)
            .filter((point, i, all) => i === 0 || i === all.length - 1
              || point.y !== all[i - 1].y || point.y === 1),
          steppedLine: true,
        }],
      };
    },
  },
  props: {
    kanjiInfos: Array,
    showCount: Number,
  },
  watch: {
    kanjiInfos() {
      this.chartData = this.getChartData();
    },
  },
};
</script>
