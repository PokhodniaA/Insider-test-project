<template>
  <div id="app">
    <app-header />
    <playground />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from '@/components/Header.vue';
import Playground from '@/components/Playground.vue'

@Component({
  components: {
    AppHeader,
    Playground
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "scss/index.scss";
#app {
  height: 100%;
  max-height: 100vh;
}
</style>
