import Vue from 'vue'
import Vuex, {ActionTree, GetterTree, MutationTree} from 'vuex'

import {
  ADD_GAME_OBJECT,
  CONTINUE_GAME,
  END_GAME,
  PAUSE_GAME, SET_NEXT_LEVEL,
  SET_TEETER_TOTTER,
  START_GAME
} from "@/store/actions.const";
import {
  CHANGE_STATUS,
  INCREASE_GAME_SPEED,
  INCREASE_LEVEL,
  RESET_STATE,
  UPDATE_TOTAL_WEIGHT
} from "@/store/mutation.const";
import {
  COMPUTER_OBJECTS,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  GAME_STATUS,
  GET_CURRENT_COMPUTER_OBJECT,
  GET_CURRENT_USER_OBJECT,
  GET_GAME_SPEED, GET_LEVEL,
  GET_TEETER_TOTTER, GET_TOTAL_WEIGHT,
  USER_OBJECTS
} from "@/store/getters.const";
import GameObject from "@/classes/GameObject";
import {getRandomPosition} from "@/utils/calculates.utils";
import TeeterTotterClass from "@/classes/TeeterTotter";
import {GAME_SPEED_CONST, FIELD_WIDTH_CONST, FIELD_HEIGHT_CONST, GAME_SPEED_INCREMENT_CONST} from "@/utils/constants";
import {IState} from "@/types/interfaces";
import {UpdateTotalWeight} from "@/types/types";
import {GameStatus, GameUser} from "@/types/enums";

Vue.use(Vuex)

const newGame = () => ({
  level: 0,
  totalWeight: {
    user: 0,
    computer: 0
  },
  objects: {
    user: [],
    computer: []
  },
  teeterTotter: null,
  gameSpeed: GAME_SPEED_CONST
});

const state: IState = {
  gameStatus: GameStatus.NEW,
  game: newGame(),
  field: {
    width: FIELD_WIDTH_CONST,
    height: FIELD_HEIGHT_CONST
  },
};

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

const mutations: MutationTree<IState> = {
  [CHANGE_STATUS](s, status: GameStatus) {
    s.gameStatus = status;
  },
  [RESET_STATE](s) {
    s.game = newGame();
  },
  [INCREASE_GAME_SPEED](s) {
    s.game.gameSpeed /= GAME_SPEED_INCREMENT_CONST;
  },
  [INCREASE_LEVEL](s) {
    s.game.level++
  },
  [UPDATE_TOTAL_WEIGHT](s, {type, weight}: UpdateTotalWeight) {
    s.game.totalWeight[type] += weight;
  }
};

const actions: ActionTree<IState, IState> = {
  [START_GAME]({ commit, dispatch }) {
    commit(RESET_STATE);
    dispatch(ADD_GAME_OBJECT, GameUser.USER);
    dispatch(ADD_GAME_OBJECT, GameUser.COMPUTER);
    dispatch(SET_TEETER_TOTTER);
    commit(CHANGE_STATUS, GameStatus.PLAY);
  },
  [PAUSE_GAME]({commit}) {
    commit(CHANGE_STATUS, GameStatus.PAUSE);
  },
  [CONTINUE_GAME]({commit}) {
    commit(CHANGE_STATUS, GameStatus.PLAY)
  },
  [END_GAME]({commit}) {
    commit(CHANGE_STATUS, GameStatus.END)
  },
  // TODO: запихнуть в мутацию
  [ADD_GAME_OBJECT]({state, getters}, type: GameUser) {
    const gameObject = new GameObject({
      x: getRandomPosition(0, getters[FIELD_WIDTH] / 2), y: 0
    });

    state.game.objects[type].push(gameObject);
  },
  [SET_TEETER_TOTTER]({state}) {
    state.game.teeterTotter = new TeeterTotterClass();
  },
  [SET_NEXT_LEVEL]({commit, dispatch}) {
    commit(INCREASE_LEVEL);
    commit(INCREASE_GAME_SPEED);
    dispatch(ADD_GAME_OBJECT, GameUser.USER);
    dispatch(ADD_GAME_OBJECT, GameUser.COMPUTER);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
