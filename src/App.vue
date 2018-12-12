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
import Header from './components/Header.vue';
import Input from './components/Input.vue';
import Result from './components/Result.vue';
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
body {
  color: #222;
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

h1, h2, p {
  margin: 0;
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
  background: green;
  flex: 1;
}

.result {
  flex: 2;
}

</style>
