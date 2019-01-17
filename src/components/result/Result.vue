<template>
  <section>
    <NavHeader
      @goToInput="$emit('goToInput')"
      v-model="selectedKanjiDataset"
      class="nav-header"
    />
    <p v-if="result.foundKanji[selectedKanjiDataset].length === 0" class="no-kanji">
      No kanji found :(
    </p>
    <template v-else>
      <FoundKanjiInfo
        :foundKanji="result.foundKanji[selectedKanjiDataset]"
        :selectedKanjiDataset="selectedKanjiDataset"
        class="result-section"
      />
      <Wanikani
        v-if="wanikani.status === 'valid'"
        :foundKanji="result.foundKanji[selectedKanjiDataset]"
        :wanikani="wanikani"
        class="result-section"
      />
      <FrequencyInfo
        :kanjiInfos="result.kanjiInfos[selectedKanjiDataset]"
        :showCount="showCount"
        class="result-section"
      />
      <Footnote class="footnote" />
    </template>
  </section>
</template>

<script>
import getResult from '../../service/get-result';
import Footnote from './Footnote.vue';
import FrequencyInfo from './FrequencyInfo.vue';
import FoundKanjiInfo from './FoundKanjiInfo.vue';
import NavHeader from './NavHeader.vue';
import Wanikani from './Wanikani.vue';

export default {
  name: 'Result',
  components: {
    Footnote,
    FoundKanjiInfo,
    FrequencyInfo,
    NavHeader,
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
@import '../../global';

.result {
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
}

.nav-header {
  padding: 20px 20px 0 20px;
}

.no-kanji {
  padding: 20px;
}

.result-section {
  $backgroundColor: #f6f6f6;

  background: $backgroundColor;
  border: 3px solid #ddd;
  border-radius: 3px;
  margin: 0px 20px 30px 20px;
  padding: 30px 20px;
  transition: border-color $transitionDuration, background-color $transitionDuration;

  &:hover {
    border-color: #ccc;
    background: lighten($backgroundColor, 1%);
  }
}

.footnote {
  padding: 20px;
}
</style>
<style lang="scss">
@import '../../global';

.result-section {
  h2 {
    color: $primary;
    font-size: 1.8em;
    text-transform: uppercase;
  }
}
</style>
