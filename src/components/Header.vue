<template>
<header class="header">
  <div class="container">
    <button @click="toggleGameStatus">{{title}}</button>
  </div>
</header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Action, Getter} from "vuex-class";
import {PAUSE_GAME, START_GAME} from "@/store/actions.const";
import {GAME_STATUS} from "@/store/getters.const";
import {GameStatus} from "@/store/index.interface";

@Component({})
export default class Header extends Vue {
  @Getter(GAME_STATUS) private gameStatus !:GameStatus;

  @Action(START_GAME) startNewGame!: () => void;
  @Action(PAUSE_GAME) pauseGame!: () => void;

  private get title() {
    switch (this.gameStatus) {
      case GameStatus.PAUSE:
        return 'Play'
      case GameStatus.PLAY:
        return 'PAUSE'
      default:
        return 'Play'
    }
  }

  private toggleGameStatus() {
    // TODO: Change toggle on play
    switch (this.gameStatus) {
      case GameStatus.PAUSE:
        this.startNewGame();
        break;
      case GameStatus.PLAY:
        this.pauseGame();
        break;
    }
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
