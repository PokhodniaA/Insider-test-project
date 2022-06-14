<template>
  <div class="playground playground-container">
    // TODO: Dived for the left and right side
    <random-object />

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

export default class Playground extends Vue {}
</script>

<style lang="scss" scoped>
.playground {
  &__teeter {
    position: absolute;
    bottom: 10%;
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
}
</style>
