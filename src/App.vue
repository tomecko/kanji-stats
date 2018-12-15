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

<style lang="scss">
@import url('../node_modules/normalize.css');

$transitionDuration: .3s;

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
  height: 60px;
  padding: 1em 20px;
  transition:
    height $transitionDuration,
    padding-top $transitionDuration,
    padding-bottom $transitionDuration;
}

.main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.input {
  flex: 1;
  transition: flex $transitionDuration;
}

.result {
  flex: 2;
  transition: padding-top $transitionDuration;
}

@media (max-width: 960px) {
  .main {
    flex-direction: column;
  }

  :not(#app.result-investigated) {
    .input {
      &.focused {
        flex: 5;
      }
    }
  }

  .result {
    border-top: 1px solid #999;
    flex: 3;
  }

  #app.result-investigated {

    .header {
      height: 0;
      padding-bottom: 0;
      padding-top: 0;
    }

    .input {
      flex: 0;
    }

    .result {
      padding-top: 50px;
    }

  }
}
</style>
