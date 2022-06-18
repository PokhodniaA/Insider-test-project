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
    score: number,
    level: number,
    gameSpeed: number,
    power: {
        user: number,
        computer: number
    },
    objects: {
        user: Array<GameObject>,
        computer: Array<GameObject>
    },
    teeterTotter: TeeterTotter|null
}

export enum GameStatus {
    PAUSE = 'pause',
    PLAY = 'play',
    END = 'end',
}

export enum GameUser {
    USER = 'user',
    COMPUTER = 'computer'
}
