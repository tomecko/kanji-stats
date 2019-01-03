<template>
  <section :class="{ focused: focused }">
    <button
      v-if="inputText.length === 0"
      @click="inputText = sampleText"
      class="load-sample-text"
    >
      load demo
    </button>
    <template v-else>
      <button
        @click="inputText = ''"
        class="clear-text"
      >
        clear
      </button>
      <button
        @click="$emit('goToResults', inputText)"
        class="get-results primary-cta"
      >
        get results
      </button>
    </template>
    <textarea
      @blur="focused = false"
      @focus="focused = true"
      v-model="inputText"
      placeholder="or paste a Japanese text here…"
    />
  </section>
</template>

<script>
import sampleText from '../../data/sample-text';

export default {
  name: 'Input',
  data() {
    return {
      focused: false,
      inputText: '',
      sampleText,
    };
  },
};
</script>

<style scoped lang="scss">
.input {
  overflow: hidden;
  position: relative;
}

.clear-text,
.load-sample-text,
.get-results {
  position: absolute;
  left: 20px;
  top: 20px;
}

.get-results {
  left: 100px;
}

textarea {
  border: 0;
  border-right: 1px solid #999;
  box-sizing: border-box;
  height: 100%;
  margin: 0;
  overflow-y: auto;
  padding: 75px 20px 20px 20px;
  width: 100%;

  &::placeholder {
    font-size: 1.2em;
  }
}
</style>
