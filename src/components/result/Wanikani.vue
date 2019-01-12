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
    <WanikaniStages
      class="stages"
      :foundKanji="foundKanji"
      :kanjiInfo="kanjiInfo"
      :srsStages="wanikani.srsStages"
    />
    <p>wykres: x - levele, y - # kanji</p>
  </div>
</template>

<script>
import Count from './Count.vue';
import WanikaniStages from './WanikaniStages.vue';

export default {
  name: 'Wanikani',
  components: { Count, WanikaniStages },
  computed: {
    learnedKanjiCount() {
      return this.foundKanji
        .filter(kanji => this.kanjiInfo[kanji] && this.kanjiInfo[kanji].srsStage >= 5).length;
    },
    learnedKanjiRatio() {
      return this.learnedKanjiCount / this.foundKanji.length;
    },
    kanjiInfo() {
      return this.wanikani
        ? this.wanikani.kanji
          .map(info => ({ ...info, char: this.wanikani.kanjiChars[info.subjectId] }))
          .reduce((acc, info) => ({ ...acc, [info.char]: info }), {})
        : null;
    },
  },
  props: {
    foundKanji: Array,
    wanikani: Object,
  },
};
</script>

<style scoped lang="scss">
.stages {
  max-width: 400px;
  padding: 30px 0;
}
</style>
