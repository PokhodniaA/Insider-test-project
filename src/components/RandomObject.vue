<template>
  <div
    class="object"
    :class="objectClass"
    :style="objectStyles"
  >
    {{ object.weight }}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {ObjectTypes, Sides} from "@/types/enums";
import {Getter} from 'vuex-class';
import {FIELD_WIDTH, GET_TEETER_TOTTER} from '@/store/getters.const';
import TeeterTotterClass from '@/classes/TeeterTotter';
import GameObject from '@/classes/GameObject';

@Component({})
export default class RandomObject extends Vue {
  @Prop({type: Object}) readonly object!: GameObject;
  @Prop({type: String}) readonly side!: Sides;
  @Prop({type: Boolean}) readonly isCurrent!: boolean;

  @Getter(GET_TEETER_TOTTER) private teeterTotter !: TeeterTotterClass;
  @Getter(FIELD_WIDTH) private fieldWidth !: number;

  /**
   * Get object dimension styles
   * @private
   */
  private get dimensions(): string {
    return `width:${this.object.width}px; height:${this.object.height}px;`;
  }

  /**
   * Get object position styles
   * @private
   */
  private get position(): string {
    return `left: ${this.object.x}px; top: ${this.object.y}px;`;
  }

  /**
   * Get object rotation depends on rotation Teeter Totter
   * @private
   */
  private get rotation(): string {
    if (this.isCurrent) {
      return '';
    }
    const angle = this.teeterTotter.rotateAngle;

    let transformOriginX, transformOriginY;

    if (this.side === Sides.LEFT) {
      transformOriginX = (this.fieldWidth / 2) - this.object.x;
      transformOriginY = this.object.height + this.teeterTotter.heightInPx / 2;
    } else {
      transformOriginX = -this.object.x;
      transformOriginY = this.object.height + this.teeterTotter.heightInPx / 2;
    }


    return `
      transform: rotate(${angle}deg);
      transform-origin: ${transformOriginX}px ${transformOriginY}px;
    `;
  }

  /**
   * Get computed object styles
   * @private
   */
  private get objectStyles(): string {
    return this.dimensions + this.position + this.rotation;
  }

  /**
   * Get object type class
   * @private
   */
  private get objectClass(): ObjectTypes {
    return this.object.objectType;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.object {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transition: left .1s;
}

.circle {
  clip-path: circle(50% at 50% 50%);
  background-color: $circle-bg;
}

.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background-color: $triangle-bg;
}

.rectangle {
  background-color: $rectangle-bg;
}
</style>
