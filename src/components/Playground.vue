<template>
  <div class="playground playground-container">
    <div ref="playground" class="playground__game">
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
import {Component, Ref, Vue, Watch} from "vue-property-decorator";
import {Getter} from 'vuex-class'
import TeeterTotter from '@/components/TeeterTotter.vue'
import RandomObject from '@/components/RandomObject.vue'
import {COMPUTER_OBJECTS, GAME_STATUS, USER_OBJECTS} from "@/store/getters.const";
import {GameStatus} from "@/store/index.interface";
import GameObject from "@/helpers/GameObject";

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

  // TODO: Change on 60 on computed height
  @Ref() playground!: {
    clientHeight: number
  }

  private ticker: number|null = null;
  private playgroundHeight = 0;

  // private OnTick() {
  //   const yPos =  this.playgroundHeight / 10 // 60 = height of element
  //   if (this.yPos + 60 >= this.playgroundHeight) {
  //     this.yPos = 0;
  //     if (this.ticker) {
  //       clearInterval(this.ticker);
  //     }
  //     return;
  //   }
  //
  //   this.yPos += yPos;
  // }

  @Watch('gameStatus')
  private startGame() {
    console.log('startGame')
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
  max-width: 600px;
  min-width: 600px;
  width: 600px;
  margin: 20px auto;
  height: 800px;
  display: flex;
  flex-direction: column;
}
</style>
