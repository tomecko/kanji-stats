<template>
  <section :class="{ focused: focused }">
    <button
      v-if="inputText.length === 0"
      @click="setInputText(sampleText)"
      class="load-sample-text"
    >
      load demo
    </button>
    <template v-else>
      <button
        @click="setInputText('')"
        class="clear-text"
      >
        clear
      </button>
      <button
        @click="$emit('goToResults', inputText)"
        class="get-results primary"
      >
        show results
      </button>
    </template>
    <textarea
      @blur="focused = false"
      @focus="focused = true"
      @input="setInputText($event.target.value)"
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
      inputText: this.initialInputText,
      sampleText,
    };
  },
  methods: {
    setInputText(inputText) {
      this.inputText = inputText;
      localStorage.setItem('inputText', inputText);
    },
  },
  props: {
    initialInputText: String,
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
  outline: 0;
  overflow-y: auto;
  padding: 75px 20px 20px 20px;
  width: 100%;

  &::placeholder {
    font-size: 1.2em;
  }
}
</style>
