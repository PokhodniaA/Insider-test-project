import {GetterTree} from "vuex";
import {IState} from "@/types/interfaces";
import {
    COMPUTER_OBJECTS,
    FIELD_HEIGHT,
    FIELD_WIDTH,
    GAME_STATUS, GET_CURRENT_COMPUTER_OBJECT, GET_CURRENT_USER_OBJECT,
    GET_GAME_SPEED, GET_LEVEL, GET_TEETER_TOTTER, GET_TOTAL_WEIGHT,
    USER_OBJECTS
} from "@/store/getters.const";
import {GameUser} from "@/types/enums";

const getters: GetterTree<IState, IState> = {
    [GAME_STATUS](s) {
        return s.gameStatus
    },
    [USER_OBJECTS](s) {
        return s.game.objects[GameUser.USER];
    },
    [COMPUTER_OBJECTS](s) {
        return s.game.objects[GameUser.COMPUTER]
    },
    [FIELD_HEIGHT](s) {
        return s.field.height
    },
    [FIELD_WIDTH](s) {
        return s.field.width
    },
    [GET_GAME_SPEED](s) {
        return s.game.gameSpeed
    },
    [GET_CURRENT_USER_OBJECT](s) {
        return s.game.objects[GameUser.USER][s.game.objects[GameUser.USER].length - 1];
    },
    [GET_CURRENT_COMPUTER_OBJECT](s) {
        return s.game.objects[GameUser.COMPUTER][s.game.objects[GameUser.COMPUTER].length - 1];
    },
    [GET_TEETER_TOTTER](s) {
        return s.game.teeterTotter;
    },
    [GET_LEVEL](s) {
        return s.game.level
    },
    [GET_TOTAL_WEIGHT](s) {
        return s.game.totalWeight
    }
}

export default getters;
