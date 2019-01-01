<template>
  <section
    @scroll="onContentsScroll"
  >
    <h2>Results</h2>
    <p>
      Following stats are based on
      <select v-model="selectedKanjiDataset">
        <option
          v-for="(dataset, name, i) in kanjiDatasets"
          :key="i"
        >
          {{ name }}
        </option>
      </select>
      kanji frequency data<br/>
      crafted by
      <a href="https://github.com/scriptin">scriptin</a>
      and gratefully grabbed from
      <a href="https://github.com/scriptin/kanji-frequency">kanji-frequency</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)
    </p>
    <p>
      Found <strong>{{ result.foundKanjis.length }}</strong> distinct kanji.<br/>
      To know <strong>80%</strong> of kanji in the provided text
      you need to be familiar with <strong>{{ kanji80Percent }}</strong>
      the most frequent kanji.<br/>
      See the chart below for details.
    </p>
    <Chart
      :kanjiInfos="result.kanjiInfos"
    />
    <p>
      And here comes the list of {{ showCount }} kanji sorted by frequency.<br/>
      Kanji found in the text are <strong>bolded</strong>.
    </p>
    <ul class="kanjis">
      <li
        v-for="(info, i) in result.kanjiInfos"
        :class="['kanji', { found: info.found }]"
        :key="info.kanji"
        :title="getKanjiTitle(info, i)"
      >
        {{ info.kanji }}
      </li>
    </ul>
  </section>
</template>

<script>
import { debounce } from 'lodash';

import kanjiDatasets from '../../data/kanji-datasets';
import getResult from '../../service/get-result';
import Chart from './Chart.vue';

export default {
  name: 'Result',
  components: {
    Chart,
  },
  computed: {
    kanji80Percent() {
      return this.result.kanjiInfos.findIndex(info => info.foundAccPercentage > 0.8) + 1;
    },
    result() {
      return getResult(this.inputText, this.showCount, this.selectedKanjiDataset);
    },
  },
  data() {
    return {
      kanjiDatasets,
      showCount: 2000,
      selectedKanjiDataset: 'wikipedia',
    };
  },
  methods: {
    getKanjiTitle(info, i) {
      return `${info.kanji}
#${i + 1} by frequency
${info.found ? '' : 'not'} found in the text`;
    },
    // eslint-disable-next-line func-names
    onContentsScroll: debounce(function (event) {
      this.$emit('scroll', event.target.scrollTop);
    }, 10),
  },
  props: {
    inputText: String,
  },
};
</script>

<style scoped lang="scss">
.result {
  background: #f5f5f5;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 20px;
}

.kanjis {
  list-style: none;
  padding: 0;
}

.kanji {
  display: inline-block;
  font-size: .8em;
  color: lighten(#000, 80%);

  &.found {
    color: lighten(#000, 20%);
  }

  &:hover {
    background: #222;
    color: #fff;
    transform: scale(2);
  }

  &:hover:not(.found) {
    background: #666;
  }
}
</style>
