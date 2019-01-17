<template>
  <section>
    <h2>WaniKani</h2>
    <div class="counts">
      <Count
        :count="wanikani.user.data.level"
      >
        your WaniKani level
      </Count>
      <Count
        :count="learnedKanjiRatio"
        percentage
      >
        you know {{ learnedKanjiCount }} kanji (GURU+)<br/>
        out of all {{ foundKanji.length }} kanji found
      </Count>
    </div>
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
        :height="400"
        :wanikani="wanikani"
      />
    </div>
  </section>
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
.counts {
  display: flex;
  flex-wrap: wrap;
}

.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px 0;
}

.stages,
.levels {
  @media (max-width: 1100px) {
    width: 100%;
  }
}

.stages {
  max-width: 450px;
}

.levels {
  flex-grow: 1;
  @media (min-width: 1100px) {
    margin-left: 50px;
  }
}
</style>
