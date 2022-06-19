import {getRandomNumber} from "@/utils/calculates.utils";
import store from "@/store";
import {FIELD_WIDTH} from "@/store/getters.const";
import {MAX_OBJECT_WEIGHT, MIN_OBJECT_WEIGHT, OBJECT_SIZE_CONST} from "@/utils/constants";
import {ObjectTypes} from "@/types/enums";
import {Params, Sizes} from "@/types/types";

export default class GameObject {
  public x!: number;
  public y!: number;
  public objectType!: ObjectTypes;
  public weight!: number;
  public sizes!: Sizes;

  constructor(params: Params) {
    this.generateObject();

    this.xPos = params.x;
    this.yPos = params.y;
  }

  /**
   * Generate new object
   * @private
   */
  private generateObject(): void {
    this.setRandomObject();
    this.setRandomWeight();
    this.setSizes();
  }

  /**
   * Set current object
   * @private
   */
  private setRandomObject(): void {
    const type = getRandomNumber(1, 4);
    switch (type) {
      case 1:
        this.objectType = ObjectTypes.CIRCLE;
        break;
      case 2:
        this.objectType = ObjectTypes.TRIANGLE;
        break;
      case 3:
        this.objectType = ObjectTypes.RECTANGLE;
        break;
    }
  }

  /**
   * Set random weight
   * @private
   */
  private setRandomWeight(): void {
    this.weight = getRandomNumber(MIN_OBJECT_WEIGHT, MAX_OBJECT_WEIGHT);
  }

  /**
   * Set object sizes
   * @private
   */
  private setSizes(): void {
    this.sizes = {
      width: OBJECT_SIZE_CONST,
      height: OBJECT_SIZE_CONST
    };
  }

  /**
   * Get object width
   */
  public get width(): number {
    return this.sizes.width;
  }

  /**
   * Get objet height
   */
  public get height(): number {
    return this.sizes.height;
  }

  /**
   * Get real center x position
   */
  public get xPos(): number {
    return Math.floor(this.x + (this.width / 2));
  }

  /**
   * Check boundaries and set x position
   * @param newX
   */
  public set xPos(newX: number) {
    let x = newX;
    if (newX <= 0) {
      x = 0;
    } else if (newX + this.width >= store.getters[FIELD_WIDTH] / 2) {
      x = store.getters[FIELD_WIDTH] / 2 - this.width;
    }

    this.x = x;
  }

  /**
   * Get real bottom y position
   */
  public get yPos(): number {
    return this.y + this.height;
  }

  /**
   * Set y position
   * @param newY
   */
  public set yPos(newY: number) {
    this.y = newY;
  }
}
