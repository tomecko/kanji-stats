<template>
  <section>
    <NavHeader v-model="selectedKanjiDataset" />
    <p v-if="result.foundKanji.length === 0">
      No kanji found.
    </p>
    <template v-else>
      <FoundKanjiInfo
        :foundKanji="result.foundKanji"
        :selectedKanjiDataset="selectedKanjiDataset"
        class="result-section"
      />
      <Wanikani
        v-if="wanikani.status === 'valid'"
        :foundKanji="result.foundKanji"
        :wanikani="wanikani"
        class="result-section"
      />
      <FrequencyInfo
        :kanjiInfos="result.kanjiInfos[selectedKanjiDataset]"
        :showCount="showCount"
        class="result-section"
      />
      <hr />
      <SourceNote />
    </template>
  </section>
</template>

<script>
import getResult from '../../service/get-result';
import FrequencyInfo from './FrequencyInfo.vue';
import FoundKanjiInfo from './FoundKanjiInfo.vue';
import NavHeader from './NavHeader.vue';
import SourceNote from './SourceNote.vue';
import Wanikani from './Wanikani.vue';

export default {
  name: 'Result',
  components: {
    FoundKanjiInfo,
    FrequencyInfo,
    NavHeader,
    SourceNote,
    Wanikani,
  },
  computed: {
    result() {
      return getResult(this.inputText, this.showCount);
    },
  },
  data() {
    return {
      selectedKanjiDataset: 'wikipedia',
      showCount: 2000,
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
  box-sizing: border-box;
  overflow-y: auto;
  padding: 20px;
  position: relative;
}

.result-section {
  margin-bottom: 50px;
}
</style>
