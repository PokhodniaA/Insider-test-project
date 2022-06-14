<template>
<div class="teeter">
  <div class="teeter__hr" />
  <div class="teeter__triangle" />
</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
  components: {
  },
})
export default class TeeterTotter extends Vue {}
</script>

<style lang="scss" scoped>
// TODO: Add func to adapt width to px 1m = 60px

.teeter {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;

  &__hr {
    width: 100%;
    height: 1px;
    background-color: red;
  }

  &__triangle {
    width: 100px;
    height: 100px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background-color: #c7c7c7;
  }
}
</style>
