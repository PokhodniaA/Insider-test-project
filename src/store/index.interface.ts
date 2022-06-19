import GameObject from "@/classes/GameObject";
import TeeterTotter from "@/classes/TeeterTotter";

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
    objects: {[key in GameUser]: Array<GameObject>},
    teeterTotter: TeeterTotter|null
}

export type TotalWeight = {[key in GameUser]: number}

export type UpdateTotalWeight = {
    type: GameUser;
    weight: number
}

export enum GameStatus {
    PAUSE = 'pause',
    PLAY = 'play',
    END = 'end',
    NEW = 'new'
}

export enum GameUser {
    USER = 'user',
    COMPUTER = 'computer'
}
