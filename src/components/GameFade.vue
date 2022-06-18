<template>
  <transition name="fade">
    <div v-show="showModal" class="game-fade__background">
      <h1>{{ title }}</h1>
      <p>{{ subTitle }}</p>
    </div>
  </transition>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Getter} from "vuex-class";
import {GAME_STATUS} from "@/store/getters.const";
import {GameStatus} from "@/store/index.interface";

// TODO: перенести enum в отдельный файл
export enum FadeTitle {
  PAUSE = 'Pause',
  END = 'Game Over'
}

export enum FadeSubtitle {
  CONTINUE = 'Press "Enter" for continue game',
  NEW = 'Press "Enter" for start new game'
}

@Component({})
export default class GameFade extends Vue {
  @Getter(GAME_STATUS) private gameStatus !:GameStatus;

  private get showModal(): boolean {
    switch (this.gameStatus) {
      case GameStatus.PAUSE:
      case GameStatus.END:
        return true;
      case GameStatus.PLAY:
      case GameStatus.NEW:
        return false;
      default:
        return false;
    }
  }

  private get title(): string {
    switch (this.gameStatus) {
      case GameStatus.PAUSE:
        return FadeTitle.PAUSE
      case GameStatus.END:
        return FadeTitle.END
      default:
        return '';
    }
  }

  private get subTitle(): string {
    switch (this.gameStatus) {
      case GameStatus.PAUSE:
        return FadeSubtitle.CONTINUE
      case GameStatus.END:
        return FadeSubtitle.NEW
      default:
        return '';
    }
  }
}
</script>

<style lang="scss" scoped>
.game-fade {
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fafafa;
    z-index: 10;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
