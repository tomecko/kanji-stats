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
    <section class="result-section">
      <Count
        :count="result.foundKanjis.length"
      >
        distinct kanji found
      </Count>
      <ul class="kanjis">
        <li
          v-for="kanji in result.foundKanjis.slice(0, foundKanjiLimit)"
          class="kanji"
          :key="kanji"
        >
          <a
            :href="`https://jisho.org/search/${kanji}%20%23kanji`"
            target="_blank"
            title="open in jisho.org"
          >
            {{ kanji }}
          </a>
        </li>
      </ul>
      <template v-if="result.foundKanjis.length > foundKanjiLimitDefault">
        <button
          class="small"
          @click="foundKanjiLimitUser = 0"
          v-if="foundKanjiLimitUser === null"
        >
          show more
        </button>
        <button
          class="small"
          @click="foundKanjiLimitUser = null"
          v-else
        >
          show less
        </button>
      </template>
    </section>
    <h2>Found kanji vs kanji frequency</h2>
    <div class="frequency-chart">
      <FrequencyLineChart
        :height="400"
        :kanjiInfos="result.kanjiInfos[selectedKanjiDataset]"
        :showCount="showCount"
      />
    </div>
    <hr />
    <p>
      Kanji frequency data crafted by
      <a href="https://github.com/scriptin">scriptin</a>
      and gratefully grabbed from
      <a href="https://github.com/scriptin/kanji-frequency">kanji-frequency</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/">CC&nbsp;BY&nbsp;4.0</a>)
    </p>
  </section>
</template>

<script>
import kanjiDatasets from '../../data/kanji-datasets';
import getResult from '../../service/get-result';
import Count from './Count.vue';
import FrequencyLineChart from './FrequencyLineChart.vue';

export default {
  name: 'Result',
  components: {
    Count,
    FrequencyLineChart,
  },
  computed: {
    foundKanjiLimit() {
      if (this.foundKanjiLimitUser !== null) {
        return this.foundKanjiLimitUser === 0 ? 9999 : this.foundKanjiLimitUser;
      }
      return this.foundKanjiLimitDefault;
    },
    result() {
      return getResult(this.inputText, this.showCount);
    },
  },
  data() {
    return {
      foundKanjiLimitDefault: 300,
      foundKanjiLimitUser: null,
      kanjiDatasets,
      kanjiPercentage: 0.9,
      showCount: 2000,
      selectedKanjiDataset: 'wikipedia',
    };
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

.frequency-chart {
  margin-bottom: 30px;
}

.result-section {
  margin-bottom: 30px;
}

.kanjis {
  list-style: none;
  padding: 0;

  &:hover .kanji {
    opacity: .7;
  }

  .kanji {
    display: inline-block;
    padding: 2px 3px;
    transition: .3s opacity;

    &:hover {
      background-color: #ddd;
      opacity: 1;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

</style>
