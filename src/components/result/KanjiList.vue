<template>
  <div>
    <slot />
    <ul class="kanjis">
      <li
        v-for="aKanji in kanji.slice(0, kanjiLimit)"
        class="kanji"
        :key="aKanji"
      >
        <input
          v-if="selectable"
          @input="$emit(
            'onSelect',
            { checked: $event.target.checked, kanji: $event.target.value },
          )"
          :checked="selectedKanji.includes(aKanji)"
          :value="aKanji"
          title="check if you know this kanji"
          type="checkbox"
        />
        <a
          :href="`https://jisho.org/search/${aKanji}%20%23kanji`"
          :title="`${aKanji}\nclick to open on jisho.org`"
          target="_blank"
        >
          {{ aKanji }}
        </a>
      </li>
    </ul>
    <template v-if="kanji.length > kanjiLimitDefault">
      <button
        class="small"
        @click="kanjiLimitUser = (kanjiLimitUser || kanjiLimitDefault) + 100"
        v-if="kanjiLimitUser === null || kanjiLimitUser < kanji.length"
      >
        show more
      </button>
      <button
        class="small"
        @click="kanjiLimitUser = null"
        v-else
      >
        show less
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'KanjiList',
  computed: {
    kanjiLimit() {
      if (this.kanjiLimitUser !== null) {
        return this.kanjiLimitUser === 0 ? 99999 : this.kanjiLimitUser;
      }
      return this.kanjiLimitDefault;
    },
  },
  data() {
    return {
      kanjiLimitDefault: 30,
      kanjiLimitUser: null,
    };
  },
  props: {
    kanji: Array,
    onSelect: Function,
    selectable: Boolean,
    selectedKanji: {
      default() {
        return [];
      },
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../global';

.kanjis {
  list-style: none;
  padding: 0;

  .kanji {
    border-radius: 3px;
    display: inline-block;
    font-size: 1.2em;

    &:hover {
      background-color: #ddd;
    }

    input {
      margin-left: 10px;
    }

    a {
      display: inline-block;
      padding: 5px 8px;
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
