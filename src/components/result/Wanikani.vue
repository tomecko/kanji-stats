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
        you know {{ learnedKanjiCount }} kanji (GURU+ or learned outside WaniKani)<br/>
        out of all {{ foundKanji.length }} kanji found
      </Count>
    </div>
    <div class="charts">
      <WanikaniStages
        class="stages"
        :foundKanji="foundKanji"
        :height="400"
        :independentlyLearnedFoundKanji="independentlyLearnedFoundKanji"
        :kanjiByStages="kanjiByStages"
        :stages="stages"
      />
      <WanikaniLevels
        class="levels"
        :foundKanji="foundKanji"
        :height="400"
        :independentlyLearnedFoundKanji="independentlyLearnedFoundKanji"
        :kanjiByStages="kanjiByStages"
        :stages="stages"
        :wanikani="wanikani"
      />
    </div>
    <WanikaniKanji
      @updateIndependentlyLearnedKanji="updateIndependentlyLearnedKanji"
      class="kanji"
      :independentlyLearnedFoundKanji="independentlyLearnedFoundKanji"
      :kanjiByStages="kanjiByStages"
      :learnedStages="learnedStages"
      :stages="stages"
    />
    <WanikaniIndependentlyLearned
      @updateIndependentlyLearnedKanji="updateIndependentlyLearnedKanji"
      v-if="independentlyLearnedFoundKanji.length > 0"
      :independentlyLearnedFoundKanji="independentlyLearnedFoundKanji"
    />
  </section>
</template>

<script>
import { groupBy, reduce } from 'lodash';

import { LOCKED, NOT_ON_WANIKANI, WANIKANI_STAGES } from '../../global';
import Count from './Count.vue';
import WanikaniIndependentlyLearned from './WanikaniIndependentlyLearned.vue';
import WanikaniKanji from './WanikaniKanji.vue';
import WanikaniLevels from './WanikaniLevels.vue';
import WanikaniStages from './WanikaniStages.vue';

export default {
  name: 'Wanikani',
  components: {
    Count,
    WanikaniIndependentlyLearned,
    WanikaniKanji,
    WanikaniLevels,
    WanikaniStages,
  },
  computed: {
    independentlyLearnedFoundKanji() {
      return reduce(
        this.kanjiByStages, (acc, kanji, stage) => this.learnedStages.includes(WANIKANI_STAGES[stage])
          ? acc
          : acc.concat(kanji),
        [],
      ).filter(kanji => this.independentlyLearnedKanji.includes(kanji));
    },
    kanjiByStages() {
      return groupBy(
        this.foundKanji,
        kanji => this.wanikani.kanjiInfos[kanji] === undefined
          ? NOT_ON_WANIKANI
          : this.wanikani.kanjiInfos[kanji].stage,
      );
    },
    learnedKanjiCount() {
      return (
        this.foundKanji.filter(
          (kanji) =>
            this.wanikani.kanjiInfos[kanji] &&
            this.learnedStages.includes(this.wanikani.kanjiInfos[kanji].srsStage),
        ).length + this.independentlyLearnedFoundKanji.length
      );
    },
    learnedKanjiRatio() {
      return this.learnedKanjiCount / this.foundKanji.length;
    },
    stages() {
      return ['Apprentice I', 'Apprentice II', 'Apprentice III', 'Apprentice IV', 'Guru I', 'Guru II', 'Master', 'Enlightened', 'Burned']
        .concat(LOCKED)
        .concat(NOT_ON_WANIKANI);
    },
  },
  data() {
    return {
      independentlyLearnedKanji: localStorage.getItem('independentlyLearnedKanji') || '',
      learnedStages: ['Guru I', 'Guru II', 'Master', 'Enlightened', 'Burned'],
    };
  },
  props: {
    foundKanji: Array,
    wanikani: Object,
  },
  methods: {
    updateIndependentlyLearnedKanji({ checked, kanji }) {
      this.independentlyLearnedKanji = checked
        ? `${this.independentlyLearnedKanji}${kanji}`
        : this.independentlyLearnedKanji.replace(kanji, '');
      localStorage.setItem('independentlyLearnedKanji', this.independentlyLearnedKanji);
    },
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
  margin-bottom: 50px;
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

.kanji {
  margin-bottom: 50px;
}
</style>
