<template>
  <div id="app">
    <Header class="header" />
    <Input
      @goToResults="goToResults"
      v-show="view === 'input'"
      class="input"
    />
    <Result
      @goToInput="goToInput"
      :inputText="inputText"
      v-if="view === 'result'"
      class="result"
    />
  </div>
</template>

<script>
import './App.scss';

import Header from './components/header/Header.vue';
import Input from './components/input/Input.vue';
import Result from './components/result/Result.vue';

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
      view: 'input', // TODO: consider adding router
    };
  },
  methods: {
    goToInput() {
      this.view = 'input';
    },
    goToResults(inputText) {
      this.view = 'result';
      this.inputText = inputText;
    },
  },
};
</script>
