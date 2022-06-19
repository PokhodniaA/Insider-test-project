import {ActionTree} from "vuex";
import {IState} from "@/types/interfaces";
import {
  ADD_GAME_OBJECT,
  CONTINUE_GAME,
  END_GAME,
  PAUSE_GAME, SET_NEXT_LEVEL,
  SET_TEETER_TOTTER,
  START_GAME
} from "@/store/actions.const";
import {CHANGE_STATUS, INCREASE_GAME_SPEED, INCREASE_LEVEL, RESET_STATE} from "@/store/mutation.const";
import {GameStatus, GameUser} from "@/types/enums";
import GameObject from "@/classes/GameObject";
import {getRandomPosition} from "@/utils/calculates.utils";
import {FIELD_WIDTH} from "@/store/getters.const";
import TeeterTotterClass from "@/classes/TeeterTotter";

const actions: ActionTree<IState, IState> = {
  /**
   * Start game
   * @param commit
   * @param dispatch
   */
  [START_GAME]({commit, dispatch}) {
    commit(RESET_STATE);
    dispatch(ADD_GAME_OBJECT, GameUser.USER);
    dispatch(ADD_GAME_OBJECT, GameUser.COMPUTER);
    dispatch(SET_TEETER_TOTTER);
    commit(CHANGE_STATUS, GameStatus.PLAY);
  },

  /**
   * Pause the game
   * @param commit
   */
  [PAUSE_GAME]({commit}) {
    commit(CHANGE_STATUS, GameStatus.PAUSE);
  },

  /**
   * Continue the game
   * @param commit
   */
  [CONTINUE_GAME]({commit}) {
    commit(CHANGE_STATUS, GameStatus.PLAY);
  },

  /**
   * End game
   * @param commit
   */
  [END_GAME]({commit}) {
    commit(CHANGE_STATUS, GameStatus.END);
  },
  /**
   * Add new game object
   * @param state
   * @param getters
   * @param type
   */
  [ADD_GAME_OBJECT]({state, getters}, type: GameUser) {
    const gameObject = new GameObject({
      x: getRandomPosition(0, getters[FIELD_WIDTH] / 2), y: 0
    });

    state.game.objects[type].push(gameObject);
  },

  /**
   * Set teeter totter state
   * @param state
   */
  [SET_TEETER_TOTTER]({state}) {
    state.game.teeterTotter = new TeeterTotterClass();
  },

  /**
   * Go to the next level
   * @param commit
   * @param dispatch
   */
  [SET_NEXT_LEVEL]({commit, dispatch}) {
    commit(INCREASE_LEVEL);
    commit(INCREASE_GAME_SPEED);
    dispatch(ADD_GAME_OBJECT, GameUser.USER);
    dispatch(ADD_GAME_OBJECT, GameUser.COMPUTER);
  }
};

export default actions;
