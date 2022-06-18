import Vue from 'vue'
import Vuex, {GetterTree} from 'vuex'
import { ActionTree } from 'vuex';
import { MutationTree } from 'vuex';

import {GameStatus, IState, GameUser} from "./index.interface";
import {ADD_GAME_OBJECT, PAUSE_GAME, START_GAME} from "@/store/actions.const";
import {CHANGE_STATUS, RESET_STATE} from "@/store/mutation.const";
import {COMPUTER_OBJECTS, FIELD_HEIGHT, GAME_STATUS, GET_GAME_SPEED, USER_OBJECTS} from "@/store/getters.const";
import GameObject from "@/helpers/GameObject";

Vue.use(Vuex)

const newGame = () => ({
  score: 0,
  level: 0,
  power: {
    user: 0,
    computer: 0,
  },
  objects: {
    user: [],
    computer: []
  },
  gameSpeed: 1000
});

const state: IState = {
  gameStatus: GameStatus.PAUSE,
  game: newGame(),
  fieldHeight: 600,
};

const getters: GetterTree<IState, IState> = {
  [GAME_STATUS](s) {
    return s.gameStatus
  },
  [USER_OBJECTS](s) {
    return s.game.objects.user;
  },
  [COMPUTER_OBJECTS](s) {
    return s.game.objects.computer
  },
  [FIELD_HEIGHT](s) {
    return s.fieldHeight
  },
  [GET_GAME_SPEED](s) {
    return s.game.gameSpeed
  }
}

const mutations: MutationTree<IState> = {
  [CHANGE_STATUS](s, status: GameStatus) {
    s.gameStatus = status;
  },
  [RESET_STATE](s) {
    s.game = newGame();
  },
};
// TODO: Check IState second args
const actions: ActionTree<IState, IState> = {
  [START_GAME]({ commit, dispatch }) {
    commit(RESET_STATE);
    dispatch(ADD_GAME_OBJECT, GameUser.USER);
    dispatch(ADD_GAME_OBJECT, GameUser.COMPUTER);
    commit(CHANGE_STATUS, GameStatus.PLAY);
  },
  [PAUSE_GAME]({commit}) {
    commit(CHANGE_STATUS, GameStatus.PAUSE);
  },
  [ADD_GAME_OBJECT]({state}, type: GameUser) {
    const gameObject = new GameObject({
      x: 0, y: 0
    });

    state.game.objects[type].push(gameObject);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
