<template>
<header class="header">
  <div class="container">
    <button @click="startGame">Play</button>
  </div>
</header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
  private startGame() {
    this.$root.$emit('start-game')
  }
}
</script>

<style lang="scss" scoped>
// TODO: Set height to variables
.header {
  width: 100%;
  height: 35px;
  background-color: #fafafa;
}
</style>
