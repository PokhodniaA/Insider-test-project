import store from "@/store";
import {FIELD_WIDTH} from "@/store/getters.const";
import {
    TEETER_TOTTER_WIDTH,
    MAX_ROTATE_ANGLE,
    HUNDRED_PERCENT_DEGREE,
    MAX_MOMENTUM,
    MAX_BENDING_PERCENT
} from '@/utils/constants'


export default class TeeterTotterClass {
    private teeterTotterWidth: number = TEETER_TOTTER_WIDTH;
    private maxRotateAngle: number = MAX_ROTATE_ANGLE;
    private momentum = 0;

    public rotateAngle = 0;

    public get bendingPercentage(): number {
        return Math.round((this.rotateAngle * 100) / HUNDRED_PERCENT_DEGREE);
    }

    public get isContinueGame(): boolean {
        return this.momentum < MAX_MOMENTUM || this.bendingPercentage < MAX_BENDING_PERCENT
    }

    public updateRotateAngle() {
        if (this.momentum === 0) {
            return 0;
        }
        this.rotateAngle = Math.round((this.maxRotateAngle * this.momentum) / MAX_MOMENTUM);
    }

    public getMomentShoulder(pos: number): number {
        const widthInPx = store.getters[FIELD_WIDTH] / 2;
        return(pos * (this.teeterTotterWidth / 2)) / widthInPx;
    }

    public setMomentum(leftSide: number, rightSide: number) {
        if (leftSide > rightSide) {
            this.momentum += rightSide - leftSide;
        } else {
            this.momentum -= leftSide - rightSide;
        }

        this.updateRotateAngle()
    }

}
