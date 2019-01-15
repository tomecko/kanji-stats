<template>
  <div
    class="wanikani"
    :class="wanikani.status"
  >
    <span class="logo"></span>
    <span
      class="user-info"
      v-if="wanikani.status === 'valid'"
    >
      Hi, {{ wanikani.user.data.username }}!
      <span class="actions">
        <button class="small text" @click="resetAPIKey">clear</button>
        <button class="small" @click="emitAPIKey(APIKey, true)">reload</button>
      </span>
    </span>
    <input
      @blur="emitAPIKey(APIKey)"
      @keyup.enter="emitAPIKey(APIKey)"
      @paste="APIKeyPasted = true"
      v-else
      v-model.trim="APIKey"
      placeholder="WaniKani user? Paste API v2 key here…"
    >
  </div>
</template>

<script>
export default {
  name: 'Wanikani',
  created() {
    if (this.APIKey) {
      this.emitAPIKey(this.APIKey);
    }
  },
  data() {
    return {
      APIKey: localStorage.getItem('APIKey') || '',
      APIKeyLastEmitted: '',
      APIKeyPasted: false,
    };
  },
  methods: {
    emitAPIKey(APIKey, force = false) {
      localStorage.setItem('APIKey', APIKey);
      if (!force && APIKey === this.APIKeyLastEmitted) {
        return;
      }
      if (this.wanikani && this.wanikani.error && this.wanikani.error.APIKey === this.APIKey) {
        return;
      }
      this.APIKeyLastEmitted = APIKey;
      this.$emit('onAPIKeyUpdate', APIKey);
    },
    resetAPIKey() {
      this.APIKey = '';
      this.emitAPIKey(this.APIKey);
    },
  },
  props: {
    wanikani: Object,
  },
  watch: {
    APIKey(APIKey) {
      if (this.APIKeyPasted) {
        this.APIKeyPasted = false;
        this.emitAPIKey(APIKey);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../global';
$size: $wanikaniBarSize;

.wanikani {
  display: flex;

  &.pending {
    animation: opacityPulse .5s infinite alternate;
    opacity: 1;
  }
}

.logo {
  background-color: #ccc;
  background-image: url(../../../public/img/wk.png);
  background-size: contain;
  display: block;
  flex: 0 0 $size;
  transition: background-color $transitionDuration;

  .valid & {
    background-color: $positive;
  }
  .error & {
    background-color: $negative;
  }
  .pending & {
    background-color: $pending;
  }
}

.user-info {
  flex: 1;
  font-weight: 700;
  line-height: $size;
  padding: 0 15px;
  transition: background-color $transitionDuration;

  .actions {
    margin-left: 10px;
  }

  button {
    margin-left: 10px;
    vertical-align: 2px;
  }

  .valid & {
    background-color: lighten($positive, 20%);
  }
}

input {
  background: #eee;
  border: 0;
  flex: 1;
  line-height: $size;
  outline: 0;
  padding: 0 14px;
  width: 100%;

  .error & {
    background-color: lighten($negative, 30%);
  }
}
</style>
