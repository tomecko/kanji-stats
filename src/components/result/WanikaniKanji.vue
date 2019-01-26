<template>
  <div>
    <div class="selector">
      Show kanji that are
      <select
        @input="userStage = $event.target.value"
        :value="stage"
      >
        <option
          v-for="nonEmptyStage in nonEmptyStages"
          :key="nonEmptyStage"
          :value="nonEmptyStage"
        >
          {{ nonEmptyStage }} ({{ kanjiByStages[nonEmptyStage].length }})
        </option>
      </select>
    </div>
    <Count :count="kanjiByStages[stage].length">
      {{ stage }}
    </Count>
    <KanjiList :kanji="kanjiByStages[stage]" />
  </div>
</template>

<script>
import { NOT_ON_WANIKANI } from '../../global';
import Count from './Count.vue';
import KanjiList from './KanjiList.vue';

export default {
  name: 'WanikaniKanji',
  components: { Count, KanjiList },
  computed: {
    nonEmptyStages() {
      return this.stages.filter(stage => this.kanjiByStages[stage]);
    },
    stage() {
      const defaultStage = this.nonEmptyStages.includes(NOT_ON_WANIKANI)
        ? NOT_ON_WANIKANI
        : this.nonEmptyStages[0];
      return this.userStage || defaultStage;
    },
  },
  data() {
    return {
      userStage: null,
    };
  },
  props: {
    kanjiByStages: Object,
    stages: Array,
  },
};
</script>

<style scoped lang="scss">
.selector {
  margin-bottom: 10px;
}
</style>
