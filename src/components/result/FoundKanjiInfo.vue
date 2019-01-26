<template>
  <section>
    <Count
      :count="foundKanji.length"
    >
      distinct kanji found
    </Count>
    <p>
      Unique kanji found sorted by <i>{{ selectedKanjiDataset }}</i> frequencies:
    </p>
    <KanjiList :kanji="foundKanji" />
  </section>
</template>

<script>
import Count from './Count.vue';
import KanjiList from './KanjiList.vue';

export default {
  name: 'FoundKanjiInfo',
  components: { Count, KanjiList },
  props: {
    foundKanji: Array,
    selectedKanjiDataset: String,
  },
};
</script>
