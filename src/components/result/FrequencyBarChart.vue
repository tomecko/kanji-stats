<script>
import { chunk } from 'lodash';
import { Bar, mixins } from 'vue-chartjs';

import { PRIMARY, SECONDARY } from '../../global';

const CHUNK_SIZE = 200;

export default {
  name: 'FrequencyBartChart',
  extends: Bar,
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
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              fontSize: 16,
              labelString: 'frequency chunks of all kanji',
            },
            stacked: true,
          }],
          yAxes: [{
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              fontSize: 16,
              labelString: '# of kanji',
            },
            stacked: true,
            ticks: {
              min: 0,
              max: CHUNK_SIZE,
            },
          }],
        },
        tooltips: {
          axis: 'x',
          backgroundColor: '#eee',
          borderColor: '#ccc',
          borderWidth: 1,
          callbacks: {
            label: () => false,
            title: data => data[0].yLabel === 0
              ? `No kanji from ${data[0].xLabel} kanji frequency group has been found in the text.`
              : `Within ${data[0].xLabel} kanji frequency chunk
${data[0].yLabel} kanji have been found in the provided text (${Math.round(data[0].yLabel / CHUNK_SIZE * 100)}%).`,
          },
          mode: 'index',
          titleFontColor: '#222',
          titleMarginBottom: 0,
        },
      },
    };
  },
  methods: {
    getChartData() {
      const foundKanjiCounts = chunk(this.kanjiInfos, CHUNK_SIZE)
        .map(kanjis => kanjis.filter(({ found }) => found).length);
      return {
        datasets: [
          {
            backgroundColor: PRIMARY,
            data: foundKanjiCounts,
            label: 'found in the text',
          },
          {
            backgroundColor: SECONDARY,
            data: foundKanjiCounts.map(count => CHUNK_SIZE - count),
            label: 'not found in the text',
          },
        ],
        labels: foundKanjiCounts
          .map((_, i) => i * CHUNK_SIZE)
          .map(i => `${i + 1} - ${i + CHUNK_SIZE}`),
      };
    },
  },
  props: {
    kanjiInfos: Array,
  },
  watch: {
    kanjiInfos() {
      this.chartData = this.getChartData();
    },
  },
};
</script>
