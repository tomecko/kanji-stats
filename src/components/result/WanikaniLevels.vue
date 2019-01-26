<script>
import { Bar, mixins } from 'vue-chartjs';

import { INDEPENDENTLY_LEARNED, WANIKANI_LEVELS } from '../../global';
import { getStageColor } from '../../helpers';

export default {
  name: 'WanikaniLevels',
  extends: Bar,
  mixins: [mixins.reactiveData],
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
  data() {
    return {
      chartData: this.getChartData(),
      chartOptions: {
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
              labelString: 'level',
            },
            stacked: true,
            ticks: {
              callback: val => val === 1 || val % 5 === 0 ? val : '',
            },
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
              stepSize: 5,
            },
          }],
        },
        title: {
          display: true,
          text: 'by WaniKani Levels',
        },
        tooltips: {
          callbacks: {
            label: (data, all) => ` ${data.yLabel} ${all.datasets[data.datasetIndex].label || 'Locked'}`,
            title: (data, all) => {
              if (!data[0]) {
                return '';
              }
              const level = all.labels[data[0].index];
              const sum = data.reduce((acc, val) => acc + val.yLabel, 0);
              return sum > 0
                ? `${sum} kanji found in the text
belong${sum === 1 ? 's' : ''} to level ${level} on WaniKani.`
                : '';
            },
          },
          filter: ({ yLabel }) => yLabel > 0,
          intersect: false,
          mode: 'index',
        },
      },
    };
  },
  methods: {
    getChartData() {
      const { kanjiInfos } = this.wanikani;
      const levels = [...Array(WANIKANI_LEVELS).keys()].map(i => i + 1);
      return {
        datasets: this.stages.map(stage => ({
          backgroundColor: getStageColor(stage),
          data: levels.map(chartLevel => (this.kanjiByStages[stage] || [])
            .filter(kanji => kanjiInfos[kanji]
              && kanjiInfos[kanji].level === chartLevel
              && this.foundKanji.includes(kanji)
              && !this.independentlyLearnedFoundKanji.includes(kanji))
            .length),
          label: stage,
        })).concat({
          backgroundColor: getStageColor(INDEPENDENTLY_LEARNED),
          data: levels.map(chartLevel => this.independentlyLearnedFoundKanji
            .filter(kanji => kanjiInfos[kanji]
              && kanjiInfos[kanji].level === chartLevel
              && this.foundKanji.includes(kanji))
            .length),
          label: INDEPENDENTLY_LEARNED,
        }),
        labels: levels.map(String),
      };
    },
  },
  props: {
    foundKanji: Array,
    independentlyLearnedFoundKanji: Array,
    kanjiByStages: Object,
    stages: Array,
    wanikani: Object,
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
