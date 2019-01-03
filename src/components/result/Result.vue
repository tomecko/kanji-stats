<template>
  <section>
    <button
      @click="$emit('goToInput')"
      class="back"
    >
      back
    </button>
    <p class="dataset-select">
      kanji frequency data: <br class="only-small" />
      <select v-model="selectedKanjiDataset">
        <option
          v-for="(dataset, name, i) in kanjiDatasets"
          :key="i"
        >
          {{ name }}
        </option>
      </select>
    </p>
    <p>
      Found <strong>{{ result.foundKanjis.length }}</strong> distinct kanji.<br/>
      To know <strong>{{ kanjiPercentage * 100 }}%</strong> of kanji in the provided text
      you need to be familiar with <strong>{{ kanjiPercentageInfo }}</strong>
      the most frequent kanji.
    </p>
    <Chart
      :height="500"
      :kanjiInfos="result.kanjiInfos[selectedKanjiDataset]"
      :showCount="showCount"
    />
    <p>
      And here comes the list of {{ showCount }} kanji sorted by frequency.<br/>
      Kanji found in the text are <strong>bolded</strong>.
    </p>
    <ul class="kanjis">
      <li
        v-for="(info, i) in result.kanjiInfos[selectedKanjiDataset]"
        :class="['kanji', { found: info.found }]"
        :key="info.kanji"
        :title="getKanjiTitle(info, i)"
      >
        {{ info.kanji }}
      </li>
    </ul>
    <p>
      Kanji frequency data crafted by
      <a href="https://github.com/scriptin">scriptin</a>
      and gratefully grabbed from
      <a href="https://github.com/scriptin/kanji-frequency">kanji-frequency</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)
    </p>
  </section>
</template>

<script>
import kanjiDatasets from '../../data/kanji-datasets';
import getResult from '../../service/get-result';
import Chart from './Chart.vue';

export default {
  name: 'Result',
  components: {
    Chart,
  },
  computed: {
    kanjiPercentageInfo() {
      return this.result.kanjiInfos[this.selectedKanjiDataset]
        .findIndex(info => info.foundAccPercentage > this.kanjiPercentage) + 1;
    },
    result() {
      return getResult(this.inputText, this.showCount);
    },
  },
  data() {
    return {
      kanjiDatasets,
      kanjiPercentage: 0.8,
      showCount: 2000,
      selectedKanjiDataset: 'wikipedia',
    };
  },
  methods: {
    getKanjiTitle(info, i) {
      return `${info.kanji}
#${i + 1} by frequency
${info.found ? '' : 'not '}found in the text`;
    },
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
  position: relative;
}

.back {
  margin-bottom: 15px;
}

.dataset-select {
  position: absolute;
  right: 20px;
  top: 20px;
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
