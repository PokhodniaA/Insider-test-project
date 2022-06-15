<template>
  <div class="object" :class="objectClass">{{weight}}</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {getRandomNumber} from "@/utils/numbers.utils";

export enum objectTypes {
  CIRCLE = 'circle',
  TRIANGLE = 'triangle',
  RECTANGLE = 'rectangle',
}

@Component({
  components: {
  },
})
export default class RandomObject extends Vue {
  private objectType: objectTypes | null = null;
  private weight: number | null = null;

  /**
   * Get object class
   * @private
   */
  private get objectClass() {
    return this.objectType
  }

  public mounted() {
    this.setRandomObject();
    this.setRandomWeight();
    console.log(this.objectType, 'this.objectType')
    console.log(this.weight, 'weight')
  }

  /**
   * Set current object
   * @private
   */
  private setRandomObject() {
    const type = getRandomNumber(1, 4);
    switch (type) {
      case 1:
        this.objectType = objectTypes.CIRCLE;
        break;
      case 2:
        this.objectType = objectTypes.TRIANGLE;
        break;
      case 3:
        this.objectType = objectTypes.RECTANGLE;
        break;
    }
  }

  /**
   * Set random weight
   * @private
   */
  private setRandomWeight() {
    this.weight = getRandomNumber(1, 11);
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
