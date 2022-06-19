<template>
  <transition name="fade">
    <div
      v-show="showModal"
      class="game-fade__background"
    >
      <h1>{{ title }}</h1>
      <p>{{ subTitle }}</p>
    </div>
  </transition>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Getter} from "vuex-class";
import {GAME_STATUS} from "@/store/getters.const";
import {
  CONTINUE_SUBTITLE_MESSAGE,
  END_MESSAGE,
  NEW_SUBTITLE_MESSAGE,
  PAUSE_MESSAGE
} from "@/utils/constants";
import {GameStatus} from "@/types/enums";

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
        return PAUSE_MESSAGE
      case GameStatus.END:
        return END_MESSAGE
      default:
        return '';
    }
  }

  private get subTitle(): string {
    switch (this.gameStatus) {
      case GameStatus.PAUSE:
        return CONTINUE_SUBTITLE_MESSAGE
      case GameStatus.END:
        return NEW_SUBTITLE_MESSAGE
      default:
        return '';
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

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
    color: $fade-color;
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
