<template>
  <div class="playground playground-container">
    <teeter-totter class="playground__teeter"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import TeeterTotter from '@/components/TeeterTotter.vue'

@Component({
  components: {
    TeeterTotter
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
.playground-container {
  position: relative;
  max-width: 800px;
  min-width: 800px;
  width: 800px;
  margin: auto;
  height: calc(100vh - 35px);
}
</style>
