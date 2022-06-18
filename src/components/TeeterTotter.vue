<template>
<div class="teeter">
  <div :style="angleStyle" class="teeter__hr" />
  <div class="teeter__triangle" />
</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Getter} from "vuex-class";
import {GET_TEETER_TOTTER} from "@/store/getters.const";
import TeeterTotterClass from "@/classes/TeeterTotter";

@Component({})
export default class TeeterTotter extends Vue {
  @Getter(GET_TEETER_TOTTER) private teeterTotter !: TeeterTotterClass;

  private get angleStyle() {
    if (!this.teeterTotter) {
      return '';
    }
    return `transform: rotate(${this.teeterTotter.rotateAngle}deg);`
  }

}
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
    height: 10px;
    background-color: #CCC;
    transition: transform .1s;
  }

  &__triangle {
    width: 100px;
    height: 100px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background-color: #c7c7c7;
  }
}
</style>
