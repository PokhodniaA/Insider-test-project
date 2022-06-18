import {getRandomNumber} from "@/utils/calculates.utils";
import store from "@/store";
import {FIELD_WIDTH} from "@/store/getters.const";

export enum objectTypes {
    CIRCLE = 'circle',
    TRIANGLE = 'triangle',
    RECTANGLE = 'rectangle',
}

type Params = {
    x: number,
    y: number
}

type Sizes = {
    width: number,
    height: number
}

export default class GameObject {
    // TODO: сделать вес и тип приватнфми и сделать геттеры
    public x!: number;
    public y!: number;
    public objectType!: objectTypes;
    public weight!: number
    private sizes!: Sizes

    constructor(params: Params) {
        this.generateObject()

        this.xPos = params.x;
        this.yPos = params.y;
    }

    /**
     * Generate new object
     * @private
     */
    private generateObject() {
        this.setRandomObject();
        this.setRandomWeight();
        this.setSizes()
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

    private setSizes() {
        this.sizes = {
            width: 60,
            height: 60
        }
    }

    public get width() {
        return this.sizes.width;
    }

    public get heigth() {
        return this.sizes.height;
    }

    /**
     * Get real center x position
     */
    public get xPos() {
        return Math.floor(this.x + (this.width / 2));
    }

    public set xPos(newX: number) {
        let x = newX;
        if (newX <= 0) {
            x = 0;
        } else if (newX + this.width >= store.getters[FIELD_WIDTH] / 2) {
            x = store.getters[FIELD_WIDTH] / 2 - this.width;
        }

        this.x = x;
    }

    public get yPos() {
        return this.y + this.heigth;
    }

    public set yPos(newY: number) {
        this.y = newY;
    }
}
