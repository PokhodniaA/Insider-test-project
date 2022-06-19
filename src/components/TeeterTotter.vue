<template>
  <div class="teeter">
    <div
      :style="angleStyle"
      class="teeter__hr"
    />
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

  /**
   * Rotate teeter totter
   * @private
   */
  private get angleStyle(): string {
    if (!this.teeterTotter) {
      return '';
    }
    return `transform: rotate(${this.teeterTotter.rotateAngle}deg);`;
  }

}
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.teeter {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;

  &__hr {
    width: 100%;
    height: 10px;
    background-color: $teeter-bg;
    transition: transform .1s;
  }

  &__triangle {
    width: $teeter-triangle-size;
    height: $teeter-triangle-size;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background-color: $teeter-bg;
  }
}
</style>
