<template>
  <div class="playground playground-container"></div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
  components: {
  },
})

export default class Playground extends Vue {}
</script>

<style lang="scss" scoped>
// TODO: get header height from variables
.playground-container {
  max-width: 800px;
  min-width: 800px;
  width: 800px;
  margin: auto;
  height: calc(100% - 35px);
}
</style>
