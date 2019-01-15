<template>
  <div id="app">
    <Header class="header" />
    <Wanikani
      @onAPIKeyUpdate="onAPIKeyUpdate"
      :wanikani="wanikani"
      class="wanikani"
    />
    <Input
      v-show="view === 'input'"
      @goToResults="goToResults"
      :initialInputText="inputText"
      class="input"
    />
    <Result
      v-if="view === 'result'"
      @goToInput="goToInput"
      :inputText="inputText"
      :wanikani="wanikani"
      class="result"
    />
  </div>
</template>

<script>
// finish WK levels chart: tooltip
// Wanikani input UX
// persist API Key and text input
// handle no kanji case

// dataset picker: add source link
// not on WK count and list
// code cleanup
// visual improvements, beautify
// google analytics
// test! QA

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
      APIKey: null,
      inputText: localStorage.getItem('inputText') || '',
      view: localStorage.getItem('view') || 'input', // TODO: consider adding router
      wanikani: { status: 'empty' },
    };
  },
  methods: {
    goToInput() {
      this.setView('input');
    },
    goToResults(inputText) {
      this.setView('result');
      this.inputText = inputText;
    },
    onAPIKeyUpdate(APIKey) {
      this.APIKey = APIKey;
      if (!APIKey || APIKey.length === 0) {
        this.wanikani = { status: 'empty' };
        return;
      }
      const wanikani = new WanikaniAPI(APIKey);
      this.wanikani = { status: 'pending' };
      Promise.all([
        wanikani.getKanjiInfos(),
        wanikani.getSrsStages(),
        wanikani.getUser(),
      ])
        .then(([kanjiInfos, srsStages, user]) => {
          if (this.APIKey === APIKey) {
            this.wanikani = {
              kanjiInfos, srsStages, status: 'valid', user,
            };
          }
        })
        .catch((error) => {
          console.error(error);
          this.wanikani = { APIKey, error, status: 'error' };
        });
    },
    setView(view) {
      this.view = view;
      localStorage.setItem('view', view);
    },
  },
};
</script>
