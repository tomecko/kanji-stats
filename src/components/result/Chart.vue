<script>
import { Line, mixins } from 'vue-chartjs';

import { THEME_COLOR, THEME_COLOR_LIGHT } from '../../global';

export default {
  name: 'Chart',
  extends: Line,
  mixins: [mixins.reactiveData],
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
  data() {
    return {
      chartData: this.getChartData(),
      chartOptions: {
        animation: {
          duration: 0,
        },
        elements: {
          point: {
            hitRadius: 10,
            radius: 0,
          },
        },
        hover: {
          animationDuration: 200,
        },
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              fontSize: 16,
              labelString: '# of kanji in given source sorted by frequency',
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
        tooltips: {
          axis: 'x',
          backgroundColor: '#eee',
          borderColor: '#ccc',
          borderWidth: 1,
          callbacks: {
            label: () => false,
            title: points => points.length > 0 // eslint-disable-line no-confusing-arrow
              ? `To know ${Math.round(points[0].yLabel * 100)}% of kanji in the provided text
you need to be familiar with ${points[0].xLabel + 1} the most frequent kanji.`
              : '',
          },
          caretPadding: 10,
          displayColors: false,
          filter: (point, data) => point.yLabel !== data.datasets[0].data[point.index - 1].y,
          mode: 'index',
          titleFontColor: '#222',
          titleMarginBottom: 0,
        },
      },
    };
  },
  methods: {
    getChartData() {
      return {
        datasets: [{
          backgroundColor: THEME_COLOR_LIGHT,
          borderColor: THEME_COLOR,
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
