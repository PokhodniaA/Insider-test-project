<template>
<header class="header">
  <div class="container">
    <button @click="startNewGame">Play</button>
  </div>
</header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Action} from "vuex-class";
import {START_GAME} from "@/store/actions.const";

@Component({})
export default class Header extends Vue {
  @Action(START_GAME) startNewGame!: () => void;
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
