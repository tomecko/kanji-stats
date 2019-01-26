<template>
  <div>
    <Count :count="independentlyLearnedFoundKanji.length">
      kanji learned outside WaniKani
    </Count>
    <KanjiList
      @onSelect="$emit('updateIndependentlyLearnedKanji', $event)"
      :kanji="independentlyLearnedFoundKanji"
      :selectedKanji="independentlyLearnedFoundKanji"
      selectable
    >
      <p>
        Kanji found in the text you have marked as learned outside WaniKani:
      </p>
    </KanjiList>
  </div>
</template>

<script>
import Count from './Count.vue';
import KanjiList from './KanjiList.vue';

export default {
  name: 'WanikaniIndependentlyLearned',
  components: { Count, KanjiList },
  props: {
    independentlyLearnedFoundKanji: Array,
  },
};
</script>

<style scoped lang="scss">
</style>
