<template>
  <section>
    <Count
      :count="foundKanji.length"
    >
      distinct kanji found
    </Count>
    <p>
      All unique kanji found in the provided text
      (sorted by frequency based on <i>{{ selectedKanjiDataset }}</i>):
    </p>
    <ul class="kanjis">
      <li
        v-for="kanji in foundKanji.slice(0, foundKanjiLimit)"
        class="kanji"
        :key="kanji"
      >
        <a
          :href="`https://jisho.org/search/${kanji}%20%23kanji`"
          title="open in jisho.org"
          target="_blank"
        >
          {{ kanji }}
        </a>
      </li>
    </ul>
    <template v-if="foundKanji.length > foundKanjiLimitDefault">
      <button
        class="small"
        @click="foundKanjiLimitUser = 0"
        v-if="foundKanjiLimitUser === null"
      >
        show more
      </button>
      <button
        class="small"
        @click="foundKanjiLimitUser = null"
        v-else
      >
        show less
      </button>
    </template>
  </section>
</template>

<script>
import Count from './Count.vue';

export default {
  name: 'FoundKanjiInfo',
  components: { Count },
  computed: {
    foundKanjiLimit() {
      if (this.foundKanjiLimitUser !== null) {
        return this.foundKanjiLimitUser === 0 ? 9999 : this.foundKanjiLimitUser;
      }
      return this.foundKanjiLimitDefault;
    },
  },
  data() {
    return {
      foundKanjiLimitDefault: 300,
      foundKanjiLimitUser: null,
    };
  },
  props: {
    foundKanji: Array,
    selectedKanjiDataset: String,
  },
};
</script>

<style scoped lang="scss">
@import '../../global';

.kanjis {
  list-style: none;
  padding: 0;

  &:hover .kanji {
    opacity: .7;
  }

  .kanji {
    display: inline-block;
    font-size: 1.2em;
    padding: 2px 3px;
    transition: $transitionDuration opacity;

    &.wanikani-learned {
      font-weight: 700;
    }

    &:hover {
      background-color: #ddd;
      opacity: 1;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
