<template>
  <div class="object" :class="objectClass" :style="position">{{weight}}</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {objectTypes} from "@/helpers/GameObject";

@Component({
  components: {
  },
})
export default class RandomObject extends Vue {
  @Prop({type: Number}) readonly x?: number;
  @Prop({type: Number}) readonly y?: number;
  @Prop({type: Number}) readonly weight?: number;
  @Prop({type: String}) readonly type?: objectTypes;

  private get position() {
    return `left: ${this.x}px; top: ${this.y}px`
  }

  private get objectClass() {
    return this.type;
  }
}
</script>

<style lang="scss" scoped>
.object {
  // TODO: Calculate width and height
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
}

.circle {
  clip-path: circle(50% at 50% 50%);
  background-color: #ff7043;
}

.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background-color: #ffa726;
}

.rectangle {
  background-color: #9ccc65;
}
</style>
