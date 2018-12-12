<template>
  <section class="result-contents">
    <template v-if="inputText.length > 0">
      <p>Unique kanji count: {{ result.foundKanjis.length }}</p>
      <ul class="kanjis">
        <li
          v-for="(info, i) in result.kanjiInfos.slice(1, 2500)"
          :class="['kanji', { found: info.found }]"
          :key="info.kanji"
          :title="getKanjiTitle(info, i)"
        >
          {{ info.kanji }}
        </li>
      </ul>
    </template>
  </section>
</template>

<script>
import getResult from '../service/get-result';

export default {
  name: 'Result',
  props: {
    inputText: String,
  },
  computed: {
    result() {
      return getResult(this.inputText);
    },
  },
  methods: {
    getKanjiTitle(info, i) {
      return `${info.kanji}
#${i + 1} by frequency
${info.found ? '' : 'not'} found in the text`;
    },
  },
};
</script>

<style scoped lang="scss">
.result-contents {
  background: #f5f5f5;
  height: 100%;
  overflow-y: auto;
  padding: 20px 30px;
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
