import Vue from 'vue'
import Vuex from 'vuex'
import { ActionTree } from 'vuex';
import { MutationTree } from 'vuex';

import {GameStatus, IState} from "@/interfaces/storeInterface";
import {START_GAME} from "@/store/actions.const";
import {RESET_STATE, START_GAME as SET_START_GAME} from "@/store/mutation.const";

Vue.use(Vuex)

const newGame = () => ({
  score: 0,
  level: 0,
  power: {
    user: 0,
    computer: 0,
  }
});

const state: IState = {
  gameStatus: GameStatus.PAUSE,
  game: null
};

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
  [START_GAME]({ commit }) {
    commit(RESET_STATE);
    commit(SET_START_GAME);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
})
