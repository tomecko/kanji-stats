<template>
  <div class="count">
    <strong class="value">{{ countText }}</strong>
    <p class="text"><slot /></p>
  </div>
</template>

<script>
export default {
  name: 'Count',
  computed: {
    countText() {
      return this.percentage
        ? `${Math.round(this.count * 100)}%`
        : this.count;
    },
  },
  props: {
    count: Number,
    percentage: Boolean,
  },
};
</script>

<style scoped lang="scss">
@import '../../global';

.count {
  align-items: center;
  margin-bottom: 15px;
  margin-right: 50px;
}

.value {
  color: $primary;
  font-size: 3em;
}

.text {
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
}

@media (min-width:800px) {
  .count {
    display: flex;
  }

  .text {
    margin-left: .6em;
  }
}
</style>
