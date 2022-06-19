<template>
  <div
    class="object"
    :class="objectClass"
    :style="objectStyles"
  >
    {{ weight }}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {ObjectTypes} from "@/types/enums";

@Component({})
export default class RandomObject extends Vue {
  @Prop({type: Number}) readonly x!: number;
  @Prop({type: Number}) readonly y!: number;
  @Prop({type: Number}) readonly weight!: number;
  @Prop({type: String}) readonly type!: ObjectTypes;
  @Prop({type: Number}) readonly width!: number;
  @Prop({type: Number}) readonly height!: number;

  /**
   * Get object dimension styles
   * @private
   */
  private get dimensions(): string {
    return `width:${this.width}px; height:${this.height}px;`;
  }

  /**
   * Get object position styles
   * @private
   */
  private get position(): string {
    return `left: ${this.x}px; top: ${this.y}px;`;
  }

  /**
   * Get computed object styles
   * @private
   */
  private get objectStyles(): string {
    return this.dimensions + this.position;
  }

  /**
   * Get object type class
   * @private
   */
  private get objectClass(): string {
    return this.type;
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
