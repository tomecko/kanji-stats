<template>
  <div id="app">
    <Header class="header" />
    <Wanikani
      @onAPIKeyUpdate="onAPIKeyUpdate"
      :wanikani="wanikani"
    />
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
import Wanikani from './components/wanikani/Wanikani.vue';
import WanikaniAPI from './service/wanikani';

export default {
  name: 'app',
  components: {
    Header,
    Input,
    Result,
    Wanikani,
  },
  data() {
    return {
      inputText: '',
      view: 'input', // TODO: consider adding router
      wanikani: null,
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
    onAPIKeyUpdate(APIKey) {
      const wanikani = new WanikaniAPI(APIKey);
      Promise.all([
        wanikani.getKanjiInfos(),
        wanikani.getKanjiChars(),
        wanikani.getUser(),
      ])
        .then(([kanji, kanjiChars, user]) => {
          this.wanikani = { kanji, kanjiChars, user };
        })
        .catch((err) => {
          console.error(err);
          this.wanikani = null;
        });
    },
  },
};
</script>
