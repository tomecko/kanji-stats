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
        :kanjiByStages="kanjiByStages"
        :stages="stages"
      />
      <WanikaniLevels
        class="levels"
        :foundKanji="foundKanji"
        :height="400"
        :kanjiByStages="kanjiByStages"
        :stages="stages"
        :wanikani="wanikani"
      />
    </div>
    <WanikaniKanji
      class="kanji"
      :kanjiByStages="kanjiByStages"
      :stages="stages"
    />
  </section>
</template>

<script>
import { groupBy } from 'lodash';

import { LOCKED, NOT_ON_WANIKANI } from '../../global';
import Count from './Count.vue';
import WanikaniKanji from './WanikaniKanji.vue';
import WanikaniLevels from './WanikaniLevels.vue';
import WanikaniStages from './WanikaniStages.vue';

export default {
  name: 'Wanikani',
  components: {
    Count,
    WanikaniKanji,
    WanikaniLevels,
    WanikaniStages,
  },
  computed: {
    kanjiByStages() {
      return groupBy(
        this.foundKanji,
        kanji => this.wanikani.kanjiInfos[kanji] === undefined
          ? NOT_ON_WANIKANI
          : this.wanikani.kanjiInfos[kanji].stage,
      );
    },
    learnedKanjiCount() {
      return this.foundKanji
        .filter(kanji => this.wanikani.kanjiInfos[kanji]
          && this.wanikani.kanjiInfos[kanji].srsStage >= 5).length;
    },
    learnedKanjiRatio() {
      return this.learnedKanjiCount / this.foundKanji.length;
    },
    stages() {
      return this.wanikani.srsStages
        // eslint-disable-next-line camelcase
        .map(({ srs_stage_name }) => srs_stage_name)
        .concat(LOCKED)
        .concat(NOT_ON_WANIKANI);
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
  margin-bottom: 30px;
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
