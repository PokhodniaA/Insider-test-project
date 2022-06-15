<template>
  <div class="playground playground-container">
    <div class="playground__game">
      <div class="playground__field">
        <random-object />
      </div>
      <div class="playground__field">
        <random-object />
      </div>
    </div>

    <teeter-totter class="playground__teeter"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import TeeterTotter from '@/components/TeeterTotter.vue'
import RandomObject from '@/components/RandomObject.vue'

@Component({
  components: {
    TeeterTotter,
    RandomObject
  },
})

export default class Playground extends Vue {
  public mounted() {
    this.$root.$on('start-game', this.startGame);
  }

  public beforeDestroy() {
    this.$root.$off('start-game', this.startGame);
  }

  private startGame() {
    //empty
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
  margin: auto;
  height: calc(100vh - 35px);
  display: flex;
  flex-direction: column;
}
</style>
