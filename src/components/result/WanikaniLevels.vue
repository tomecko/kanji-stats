<script>
import { groupBy } from 'lodash';
import { Bar, mixins } from 'vue-chartjs';

import { WANIKANI_LEVELS } from '../../global';
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
              labelString: 'levels',
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
          text: 'Wanikani Levels',
        },
        tooltips: {
          callbacks: {
            label: (data, all) => ` ${data.yLabel} ${all.datasets[data.datasetIndex].label || 'Unlocked'}`,
            title: (data, all) => {
              if (!data[0]) {
                return '';
              }
              const level = all.labels[data[0].index];
              const sum = data.reduce((acc, val) => acc + val.yLabel, 0);
              return sum > 0
                ? `${sum} kanji found in the text belong${
                  sum === 1 ? 's' : ''} to level ${level} on WaniKani.
Breakdown by SRS stages:`
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
      const { kanjiInfos, srsStages } = this.wanikani;
      const groupedKanjiInfo = groupBy(
        Object.values(kanjiInfos).filter(({ kanji }) => this.foundKanji.includes(kanji)),
        ({ srsStageName }) => srsStageName,
      );
      const levels = [...Array(WANIKANI_LEVELS).keys()].map(i => i + 1);
      return {
        datasets: srsStages.concat({ srs_stage_name: undefined }).map(stage => ({
          backgroundColor: getStageColor(stage),
          data: levels.map(chartLevel => (groupedKanjiInfo[stage.srs_stage_name] || [])
            .filter(({ level }) => level === chartLevel).length),
          label: stage.srs_stage_name,
        })),
        labels: levels.map(String),
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
