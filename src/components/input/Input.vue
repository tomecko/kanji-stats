<template>
  <section :class="{ focused: focused }">
    <button
      v-if="value.length === 0"
      @click="$emit('loadSampleText')"
      class="load-sample-text"
    >
      load sample text
    </button>
    <button
      v-else
      @click="$emit('clearText')"
      class="clear-text"
    >
      clear
    </button>
    <textarea
      @blur="focused = false"
      @focus="focused = true"
      @input="$emit('input', $event.target.value)"
      :value="value"
      placeholder="or paste a text here"
    />
  </section>
</template>

<script>
export default {
  name: 'Input',
  data() {
    return {
      focused: false,
    };
  },
  props: {
    value: String,
  },
};
</script>

<style scoped lang="scss">
.input {
  overflow: hidden;
  position: relative;
}

.load-sample-text,
.clear-text {
  left: 20px;
  position: absolute;
  top: 20px;
}

textarea {
  border: 0;
  border-right: 1px solid #999;
  box-sizing: border-box;
  height: 100%;
  margin: 0;
  overflow-y: auto;
  padding: 60px 20px 20px 20px;
  width: 100%;
}
</style>
