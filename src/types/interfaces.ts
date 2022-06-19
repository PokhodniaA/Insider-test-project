import GameObject from "@/classes/GameObject";
import TeeterTotter from "@/classes/TeeterTotter";
import {TotalWeight} from "@/types/types";
import {GameStatus, GameUser} from "@/types/enums";

export interface IState {
  gameStatus: GameStatus,
  game: IGameState,
  field: {
    width: number,
    height: number
  },
}

export interface IGameState {
  level: number,
  gameSpeed: number,
  totalWeight: TotalWeight,
  objects: { [key in GameUser]: Array<GameObject> },
  teeterTotter: TeeterTotter | null
}
