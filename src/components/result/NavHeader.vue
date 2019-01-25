<template>
  <div>
    <button
      @click="$emit('goToInput')"
      class="back"
    >
      back
    </button>
    <p class="dataset-select">
      kanji frequency data: <br class="only-small" />
      <select
        @input="$emit('input', $event.target.value)"
        :value="value"
      >
        <option
          v-for="(dataset, name, i) in kanjiDatasets"
          :key="i"
        >
          {{ name }}
        </option>
      </select>
      {{ }}
      <small><a href="https://github.com/scriptin/kanji-frequency" target="_blank">(source)</a></small>
    </p>
  </div>
</template>

<script>
import kanjiDatasets from '../../data/kanji-datasets';

export default {
  name: 'NavHeader',
  data() {
    return {
      kanjiDatasets,
    };
  },
  props: {
    value: String,
  },
};
</script>

<style scoped lang="scss">
.back {
  margin-bottom: 15px;
}

.dataset-select {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
