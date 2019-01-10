<template>
  <div class="wanikani">
    <input
      @blur="$emit('onAPIKeyUpdate', inputText)"
      :class="{ valid: wanikani && Boolean(wanikani.user) }"
      v-model="inputText"
      placeholder="paste WaniKani API v2 key…"
    >
  </div>
</template>

<script>
export default {
  name: 'Wanikani',
  data() {
    return {
      inputText: '',
    };
  },
  props: {
    wanikani: Object,
  },
};
</script>

<style scoped lang="scss">
input {
  background: #eee;
  border: 0;
  outline: 0;
  padding: 6px 20px;
  width: 100%;

  &.valid {
    background: #d9ffce;
  }
}
</style>
