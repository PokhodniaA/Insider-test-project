import Vue from 'vue'
import Vuex, {GetterTree} from 'vuex'
import { ActionTree } from 'vuex';
import { MutationTree } from 'vuex';

import {GameStatus, IState, GameUser} from "./index.interface";
import {ADD_GAME_OBJECT, START_GAME} from "@/store/actions.const";
import {RESET_STATE, START_GAME as SET_START_GAME} from "@/store/mutation.const";
import {COMPUTER_OBJECTS, GAME_STATUS, USER_OBJECTS} from "@/store/getters.const";
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
  }
});

const state: IState = {
  gameStatus: GameStatus.PAUSE,
  game: newGame(),
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
  }
}

const mutations: MutationTree<IState> = {
  [SET_START_GAME](s) {
    s.gameStatus = GameStatus.PLAY;
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
    commit(SET_START_GAME);
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
