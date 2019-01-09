<template>
  <div class="count">
    <strong class="value">{{ count }}</strong>
    <p class="text"><slot /></p>
  </div>
</template>

<script>
export default {
  name: 'Count',
  props: {
    count: Number,
  },
};
</script>

<style scoped lang="scss">
@import '../../global';

.count {
  align-items: center;
  margin-right: 40px;
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
