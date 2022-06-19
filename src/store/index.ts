import Vue from "vue";
import Vuex from "vuex";

import {GAME_SPEED_CONST, FIELD_WIDTH_CONST, FIELD_HEIGHT_CONST} from "@/utils/constants";
import {IGameState, IState} from "@/types/interfaces";
import {GameStatus} from "@/types/enums";
import mutations from "@/store/mutation";
import getters from "@/store/getters";
import actions from "@/store/actions";

Vue.use(Vuex);

export const newGame = (): IGameState => ({
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
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
