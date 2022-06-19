import store from "@/store";
import {FIELD_WIDTH} from "@/store/getters.const";

const TEETER_TOTTER_WIDTH = 10;
const MAX_ROTATE_ANGLE = 14;

export default class TeeterTotterClass {
    private teeterTotterWidth: number = TEETER_TOTTER_WIDTH;
    private maxRotateAngle: number = MAX_ROTATE_ANGLE;
    private momentum = 0;

    public rotateAngle = 0;

    public get bendingPercentage(): number {
        return Math.round((this.rotateAngle * 100) / 45);
    }

    public get isContinueGame(): boolean {
        return this.momentum < 20 || this.bendingPercentage < 30
    }

    public updateRotateAngle() {
        if (this.momentum === 0) {
            return 0;
        }
        this.rotateAngle = Math.round((this.maxRotateAngle * this.momentum) / 20);
    }

    public getMomentShoulder(pos: number): number {
        const widthInPx = store.getters[FIELD_WIDTH] / 2;
        return(pos * (this.teeterTotterWidth / 2)) / widthInPx;
    }

    public setMomentum(leftSide: number, rightSide: number) {
        console.log(leftSide, 'left-momentum')
        console.log(rightSide, 'right-momentum')
        if (leftSide > rightSide) {
            this.momentum += rightSide - leftSide;
        } else {
            this.momentum -= leftSide - rightSide;
        }
        console.log(this.momentum, 'setted momentum')

        this.updateRotateAngle()
    }

}
