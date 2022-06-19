<template>
  <div class="playground playground-container" :style="containerStyles">
    <div class="playground__game" :style="gameAreaStyles">
      <div class="playground__field">
        <random-object
            v-for="(user, idx) in users"
            :key="idx + 'user'"
            :x="user.x"
            :y="user.y"
            :type="user.objectType"
            :weight="user.weight"
            :width="user.width"
            :height="user.heigth"
        />
      </div>
      <div class="playground__field">
        <random-object
            v-for="(ai, idx) in computers"
            :key="idx + 'comp'"
            :x="ai.x"
            :y="ai.y"
            :type="ai.objectType"
            :weight="ai.weight"
            :width="ai.width"
            :height="ai.heigth"
        />
      </div>
    </div>

    <teeter-totter class="playground__teeter"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {Action, Getter, Mutation} from 'vuex-class'
import TeeterTotter from '@/components/TeeterTotter.vue'
import RandomObject from '@/components/RandomObject.vue'
import {
  COMPUTER_OBJECTS,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  GAME_STATUS, GET_CURRENT_COMPUTER_OBJECT, GET_CURRENT_USER_OBJECT,
  GET_GAME_SPEED, GET_LEVEL, GET_TEETER_TOTTER,
  USER_OBJECTS
} from "@/store/getters.const";
import {GameStatus, GameUser, UpdateTotalWeight} from "@/store/index.interface";
import GameObject from "@/classes/GameObject";
import TeeterTotterClass from "@/classes/TeeterTotter";
import {CONTINUE_GAME, END_GAME, PAUSE_GAME, SET_NEXT_LEVEL, START_GAME} from "@/store/actions.const";
import {getLeftDistanceFromCenter, getMomentum} from "@/utils/calculates.utils";
import {UPDATE_TOTAL_WEIGHT} from "@/store/mutation.const";
import {MAX_LEVEL_CONST, MOVE_PIXELS_PER_TICK} from "@/utils/constants";

export enum Keyboard {
  ENTER = 'Enter',
  ESC = 'Escape',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
}

@Component({
  components: {
    TeeterTotter,
    RandomObject
  },
})

export default class Playground extends Vue {
  @Getter(GAME_STATUS) private gameStatus !:GameStatus;
  @Getter(USER_OBJECTS) private users !:Array<GameObject>;
  @Getter(COMPUTER_OBJECTS) private computers !:Array<GameObject>;
  @Getter(FIELD_HEIGHT) private fieldHeight !: number;
  @Getter(FIELD_WIDTH) private fieldWidth !: number;
  @Getter(GET_GAME_SPEED) private gameSpeed !: number;
  @Getter(GET_CURRENT_USER_OBJECT) private userObject !: GameObject;
  @Getter(GET_CURRENT_COMPUTER_OBJECT) private computerObject !: GameObject;
  @Getter(GET_TEETER_TOTTER) private teeterTotter !: TeeterTotterClass;
  @Getter(GET_LEVEL) private gameLevel !: number;

  @Action(START_GAME) private startGame !: () => void;
  @Action(PAUSE_GAME) private pauseGame !: () => void;
  @Action(END_GAME) private endGame !: () => void;
  @Action(CONTINUE_GAME) continueGame!: () => void;
  @Action(SET_NEXT_LEVEL) setNextLevel!: () => void;

  @Mutation(UPDATE_TOTAL_WEIGHT) updateTotalWeight!: (data: UpdateTotalWeight) => void;

  private ticker: number|null = null;

  private get gameAreaStyles() {
    return `height: ${this.fieldHeight}px;`
  }

  private get containerStyles() {
    return `
    width:${this.fieldWidth}px;
    min-width:${this.fieldWidth}px;
    max-width:${this.fieldWidth}px;
    `;
  }

  public mounted() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  public beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  private onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case Keyboard.ENTER:
        if (this.gameStatus === GameStatus.PLAY) {
          return;
        }

        if (this.gameStatus === GameStatus.PAUSE) {
          this.continueGame();
          return;
        }

        this.startGame();
        break;
      case Keyboard.ESC:
        if (this.gameStatus === GameStatus.PAUSE) {
          return;
        }

        this.pauseGame();
        break;
      case Keyboard.LEFT:
        if (this.gameStatus !== GameStatus.PLAY) {
          return;
        }

        this.userObject.xPos = this.userObject.x - this.userObject.width / 2
        break;
      case Keyboard.RIGHT:
        if (this.gameStatus !== GameStatus.PLAY) {
          return;
        }

        this.userObject.xPos = this.userObject.x + this.userObject.width / 2
        break;
    }
  }

  private onTick() {
    // TODO: поставить проверку в начале
    this.userObject.yPos = this.userObject.y + MOVE_PIXELS_PER_TICK
    this.computerObject.yPos = this.computerObject.y + MOVE_PIXELS_PER_TICK

    if (
        this.userObject.yPos >= this.fieldHeight
        || this.computerObject.yPos >= this.fieldHeight
    ) {
      // TODO: вынести в отдельные ф-ии
      this.updateTotalWeight({type: GameUser.USER, weight: this.userObject.weight})
      this.updateTotalWeight({type: GameUser.COMPUTER, weight: this.computerObject.weight})

      const userShoulder = this.teeterTotter.getMomentShoulder(
          getLeftDistanceFromCenter(this.userObject.xPos, 0, this.fieldWidth / 2)
      );
      const computerShoulder = this.teeterTotter.getMomentShoulder(this.computerObject.xPos);

      const userMomentum = Math.round(getMomentum(userShoulder, this.userObject.weight));
      const computerMomentum = Math.round(getMomentum(computerShoulder, this.computerObject.weight));
      this.teeterTotter.setMomentum(userMomentum, computerMomentum)

      if (this.gameLevel < MAX_LEVEL_CONST && this.teeterTotter.isContinueGame) {
        this.setNextLevel()
        this.onPauseGame();
        this.onStartGame();
      } else {
        this.endGame();
      }
    }
  }

  private onStartGame() {
    this.ticker = setInterval(this.onTick, this.gameSpeed)
  }

  private onPauseGame() {
    if (this.ticker === null) {
      return;
    }

    clearInterval(this.ticker);
    this.ticker = null;
  }

  @Watch('gameStatus')
  private changeStatus() {
    switch (this.gameStatus) {
      case GameStatus.PAUSE:
      case GameStatus.END:
        this.onPauseGame();
        break;
      case GameStatus.PLAY:
        this.onStartGame();
        break;
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.playground {
  padding-bottom: 50px;
  &__teeter {

  }

  &__game {
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1;
    border-bottom: 1px solid $teeter-line-color;
  }

  &__field {
    width: 50%;
    position: relative;
  }
}

.playground-container {
  position: relative;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}
</style>
