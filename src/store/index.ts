import Vue from 'vue'
import Vuex from 'vuex'
import { ActionTree } from 'vuex';
import { MutationTree } from 'vuex';

import {IState} from "@/interfaces/storeInterface";
import {START_GAME} from "@/store/actions.const";
import {RESET_STATE} from "@/store/mutation.const";

Vue.use(Vuex)

const newGame = () => ({
  score: 0,
  level: 0,
  power: {
    user: 0,
    computer: 0,
  }
});

const state: IState = newGame();

const mutations: MutationTree<IState> = {
  [RESET_STATE](s) {
    s = newGame();
  }
};
// TODO: Check IState second args
const actions: ActionTree<IState, IState> = {
  [START_GAME]({ commit }) {
    commit(RESET_STATE);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
})
