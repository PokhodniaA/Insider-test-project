import store from "@/store";
import {FIELD_WIDTH} from "@/store/getters.const";
import {
  TEETER_TOTTER_WIDTH,
  MAX_ROTATE_ANGLE,
  HUNDRED_PERCENT_DEGREE,
  MAX_MOMENTUM,
  MAX_BENDING_PERCENT
} from '@/utils/constants';

export default class TeeterTotterClass {
  private teeterTotterWidth: number = TEETER_TOTTER_WIDTH;
  private maxRotateAngle: number = MAX_ROTATE_ANGLE;
  private momentum = 0;

  public rotateAngle = 0;

  /**
   * Get teeter totter bending in percent
   */
  public get bendingPercentage(): number {
    return Math.round((this.rotateAngle * 100) / HUNDRED_PERCENT_DEGREE);
  }

  /**
   * Check the parameters satisfy the condition to continue the game
   */
  public get isContinueGame(): boolean {
    return this.momentum < MAX_MOMENTUM || this.bendingPercentage < MAX_BENDING_PERCENT;
  }

  /**
   * Update rotating angle in degrees
   */
  public updateRotateAngle(): void {
    this.rotateAngle = Math.round((this.maxRotateAngle * this.momentum) / MAX_MOMENTUM);
  }

  /**
   * Get moment arm of teeter totter
   * @param pos
   */
  public getMomentArm(pos: number): number {
    const widthInPx = store.getters[FIELD_WIDTH] / 2;
    return (pos * (this.teeterTotterWidth / 2)) / widthInPx;
  }

  /**
   * Update current momentum
   * Momentum can be positive or negative
   * @param leftSide
   * @param rightSide
   */
  public setMomentum(leftSide: number, rightSide: number): void {
    if (leftSide > rightSide) {
      this.momentum += rightSide - leftSide;
    } else {
      this.momentum -= leftSide - rightSide;
    }

    this.updateRotateAngle();
  }
}
