<template>
  <div id="app">
    <game-header />
    <game-controls />
    <game-playground />
    <game-fade />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import GameHeader from '@/components/GameHeader.vue';
import GamePlayground from '@/components/GamePlayground.vue';
import GameFade from '@/components/GameFade.vue';
import GameControls from '@/components/GameControls.vue';

@Component({
  components: {
    GameHeader,
    GamePlayground,
    GameFade,
    GameControls
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import "scss/index.scss";

#app {
  height: 100%;
  max-height: 100vh;
}
</style>
