<template>
  <div id="app">
    <Header class="header" />
    <main class="main">
      <Input
        @clearText="inputText = ''"
        @loadSampleText="loadSampleText"
        v-model="inputText"
        class="input"
      />
      <Result
        :inputText="inputText"
        class="result"
      />
    </main>
  </div>
</template>

<script>
import Header from './components/header/Header.vue';
import Input from './components/input/Input.vue';
import Result from './components/result/Result.vue';
import sampleText from './data/sample-text';

export default {
  name: 'app',
  components: {
    Header,
    Input,
    Result,
  },
  data() {
    return {
      inputText: '',
    };
  },
  methods: {
    loadSampleText() {
      this.inputText = sampleText;
    },
  },
};
</script>

<style lang="scss">
@import url('../node_modules/normalize.css');
body {
  color: #222;
  font-family: sans-serif;
  padding: 0;
  overflow: hidden;
}

h1, h2, p {
  margin-top: 0;
}

p {
  line-height: 1.45;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background: #e26f6f;
  border-bottom: 1px solid #999;
  color: #fff;
  padding: 1em 20px;
}

.main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.input {
  flex: 1;
}

.result {
  flex: 2;
}

@media (max-width: 960px) {
  .main {
    flex-direction: column;
  }

  .result {
    border-top: 1px solid #999;
  }
}
</style>
