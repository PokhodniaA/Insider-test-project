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
  /**
   * Change game status
   * @param s
   * @param status
   */
  [CHANGE_STATUS](s, status: GameStatus): void {
    s.gameStatus = status;
  },

  /**
   * Set new game state
   * @param s
   */
  [RESET_STATE](s): void {
    s.game = newGame();
  },

  /**
   * Increase game speed
   * @param s
   */
  [INCREASE_GAME_SPEED](s): void {
    s.game.gameSpeed /= GAME_SPEED_INCREMENT_CONST;
  },

  /**
   * Increase game level
   * @param s
   */
  [INCREASE_LEVEL](s): void {
    s.game.level++;
  },

  /**
   * Add user or computer total weight
   * @param s
   * @param type
   * @param weight
   */
  [UPDATE_TOTAL_WEIGHT](s, {type, weight}: UpdateTotalWeight) {
    s.game.totalWeight[type] += weight;
  }
};

export default mutations;
