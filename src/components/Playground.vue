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
        />
      </div>
    </div>

    <teeter-totter class="playground__teeter"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {Getter} from 'vuex-class'
import TeeterTotter from '@/components/TeeterTotter.vue'
import RandomObject from '@/components/RandomObject.vue'
import {
  COMPUTER_OBJECTS,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  GAME_STATUS, GET_CURRENT_COMPUTER_OBJECT, GET_CURRENT_USER_OBJECT,
  GET_GAME_SPEED,
  USER_OBJECTS
} from "@/store/getters.const";
import {GameStatus} from "@/store/index.interface";
import GameObject from "@/classes/GameObject";

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

  private onTick() {
    this.userObject.yPos = this.userObject.y + this.fieldHeight / 10
    this.computerObject.yPos = this.computerObject.y + this.fieldHeight / 10

    if (
        this.userObject.y + this.userObject.heigth >= this.fieldHeight
        || this.computerObject.y + this.userObject.heigth >= this.fieldHeight
    ) {
      this.endGame()
    }
  }

  private startGame() {
    this.ticker = setInterval(this.onTick, this.gameSpeed)
  }

  private endGame() {
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
        this.endGame();
        break;
      case GameStatus.PLAY:
        this.startGame();
        break;
    }
  }

}
</script>

<style lang="scss" scoped>
.playground {
  padding-bottom: 50px;
  &__teeter {

  }

  &__game {
    width: 100%;
    height: 100%;
    display: flex;
  }

  &__field {
    width: 50%;
    position: relative;
  }
}

// TODO: get header height from variables
// TODO: Add func to adapt width to px 1m = 60px
.playground-container {
  position: relative;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}
</style>
