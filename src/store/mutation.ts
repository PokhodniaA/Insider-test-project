import {MutationTree} from "vuex";
import {IState} from "@/types/interfaces";
import {
  CHANGE_STATUS,
  INCREASE_GAME_SPEED,
  INCREASE_LEVEL,
  RESET_STATE,
  UPDATE_TOTAL_WEIGHT
} from "@/store/mutation.const";
import {GameStatus} from "@/types/enums";
import {newGame} from "@/store/index";
import {GAME_SPEED_INCREMENT_CONST} from "@/utils/constants";
import {UpdateTotalWeight} from "@/types/types";

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
    s.game.level++;
  },
  [UPDATE_TOTAL_WEIGHT](s, {type, weight}: UpdateTotalWeight) {
    s.game.totalWeight[type] += weight;
  }
};

export default mutations;
