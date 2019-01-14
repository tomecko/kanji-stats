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
      <p>
        All unique kanji found in the provided text
        (sorted by frequency based on <i>{{ selectedKanjiDataset }}</i>):
      </p>
      <ul class="kanjis">
        <li
          v-for="kanji in result.foundKanjis.slice(0, foundKanjiLimit)"
          class="kanji"
          :key="kanji"
        >
          <a
            :href="`https://jisho.org/search/${kanji}%20%23kanji`"
            title="open in jisho.org"
            target="_blank"
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
    <section class="result-section">
      <Wanikani
        :foundKanji="result.foundKanjis"
        :wanikani="wanikani"
      />
    </section>
    <section class="result-section">
      <h2>Kanji frequency</h2>
      <div class="frequency-charts">
        <FrequencyLineChart
          class="chart"
          :height="400"
          :kanjiInfos="result.kanjiInfos[selectedKanjiDataset]"
          :showCount="showCount"
        />
        <FrequencyBarChart
          class="chart"
          :height="400"
          :kanjiInfos="result.kanjiInfos[selectedKanjiDataset]"
          :showCount="showCount"
        />
      </div>
    </section>
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
import FrequencyBarChart from './FrequencyBarChart.vue';
import FrequencyLineChart from './FrequencyLineChart.vue';
import Wanikani from './Wanikani.vue';

export default {
  name: 'Result',
  components: {
    Count,
    FrequencyBarChart,
    FrequencyLineChart,
    Wanikani,
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
    wanikani: Object,
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

.result-section {
  margin-bottom: 30px;
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

  &:hover .kanji {
    opacity: .7;
  }

  .kanji {
    display: inline-block;
    font-size: 1.2em;
    padding: 2px 3px;
    transition: .3s opacity;

    &.wanikani-learned {
      font-weight: 700;
    }

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

.frequency-charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .chart {
    margin-bottom: 30px;
    width: 48%;
    @media (max-width: 1100px) {
      width: 100%;
    }
  }
}

</style>
