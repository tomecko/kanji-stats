<template>
  <div>
    <h2>WaniKani</h2>
    <Count
      :count="learnedKanjiRatio"
      percentage
    >
      you know (GURU+) {{ learnedKanjiCount }} kanji<br/>
      out of all {{ foundKanji.length }} kanji found in the text
    </Count>
    <div class="charts">
      <WanikaniStages
        class="stages"
        :foundKanji="foundKanji"
        :height="400"
        :wanikani="wanikani"
      />
      <WanikaniLevels
        class="levels"
        :foundKanji="foundKanji"
        :height="200"
        :wanikani="wanikani"
      />
    </div>
  </div>
</template>

<script>
import Count from './Count.vue';
import WanikaniLevels from './WanikaniLevels.vue';
import WanikaniStages from './WanikaniStages.vue';

export default {
  name: 'Wanikani',
  components: { Count, WanikaniLevels, WanikaniStages },
  computed: {
    learnedKanjiCount() {
      return this.foundKanji
        .filter(kanji => this.wanikani.kanjiInfos[kanji]
          && this.wanikani.kanjiInfos[kanji].srsStage >= 5).length;
    },
    learnedKanjiRatio() {
      return this.learnedKanjiCount / this.foundKanji.length;
    },
  },
  props: {
    foundKanji: Array,
    wanikani: Object,
  },
};
</script>

<style scoped lang="scss">
.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px 0;
}
.stages {
  flex: 1;
  max-width: 400px;
}
.levels {
  flex: 1;
  margin-left: 50px;
  min-width: 800px;
}
</style>
