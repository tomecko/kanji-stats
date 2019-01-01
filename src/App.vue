<template>
  <div
    :class="{ 'result-investigated': resultScrollTop > 0 }"
    id="app"
  >
    <Header class="header" />
    <main class="main">
      <Input
        @clearText="inputText = ''"
        @loadSampleText="loadSampleText"
        v-model="inputText"
        class="input"
      />
      <Result
        @scroll="onResultScroll"
        :inputText="inputText"
        v-if="Boolean(inputText)"
        class="result"
      />
    </main>
  </div>
</template>

<script>
import './App.scss';

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
      resultScrollTop: 0,
    };
  },
  methods: {
    loadSampleText() {
      this.inputText = sampleText;
    },
    onResultScroll(y) {
      this.resultScrollTop = y;
    },
  },
};
</script>
