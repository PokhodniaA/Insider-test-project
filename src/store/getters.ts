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
import {GameStatus, GameUser} from "@/types/enums";
import GameObject from '@/classes/GameObject';
import TeeterTotterClass from '@/classes/TeeterTotter';
import {TotalWeight} from '@/types/types';

const getters: GetterTree<IState, IState> = {
  /**
   * Get game status
   * @param s
   */
  [GAME_STATUS](s): GameStatus {
    return s.gameStatus;
  },

  /**
   * Get user objects
   * @param s
   */
  [USER_OBJECTS](s): GameObject[] {
    return s.game.objects[GameUser.USER];
  },

  /**
   * Get computer objects
   * @param s
   */
  [COMPUTER_OBJECTS](s): GameObject[] {
    return s.game.objects[GameUser.COMPUTER];
  },

  /**
   * Get field height
   * @param s
   */
  [FIELD_HEIGHT](s): number {
    return s.field.height;
  },

  /**
   * Get field width
   * @param s
   */
  [FIELD_WIDTH](s): number {
    return s.field.width;
  },

  /**
   * Get game speed
   * @param s
   */
  [GET_GAME_SPEED](s): number {
    return s.game.gameSpeed;
  },

  /**
   * Get current user game object
   * @param s
   */
  [GET_CURRENT_USER_OBJECT](s): GameObject {
    return s.game.objects[GameUser.USER][s.game.objects[GameUser.USER].length - 1];
  },

  /**
   * Get current computer object
   * @param s
   */
  [GET_CURRENT_COMPUTER_OBJECT](s): GameObject {
    return s.game.objects[GameUser.COMPUTER][s.game.objects[GameUser.COMPUTER].length - 1];
  },

  /**
   * Get teeter totter state
   * @param s
   */
  [GET_TEETER_TOTTER](s): TeeterTotterClass|null {
    return s.game.teeterTotter;
  },

  /**
   * Get level count
   * @param s
   */
  [GET_LEVEL](s): number {
    return s.game.level;
  },

  /**
   * Get total weight
   * @param s
   */
  [GET_TOTAL_WEIGHT](s): TotalWeight {
    return s.game.totalWeight;
  }
};

export default getters;
