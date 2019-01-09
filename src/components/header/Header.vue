<template>
  <header>
    <h1 class="heading">Kanji Stats</h1>
    <h2 class="subheading">check Japanese text difficulty</h2>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped lang="scss">
@import '../../global';

.header {
  background: $primary;
  border-bottom: 1px solid #999;
  color: #fff;
  height: 60px;
  padding: 1em 20px;
}

.heading,
.subheading {
  margin: 0;
}

.subheading {
  font-size: 1.2em;
}
</style>
