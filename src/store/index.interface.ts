import GameObject from "@/helpers/GameObject";

export interface IState {
    gameStatus: GameStatus,
    game: IGameState,
}

export interface IGameState {
    score: number,
    level: number,
    power: {
        user: number,
        computer: number
    },
    objects: {
        user: Array<GameObject>,
        computer: Array<GameObject>
    }
}

export enum GameStatus {
    PAUSE = 'pause',
    PLAY = 'play'
}

export enum GameUser {
    USER = 'user',
    COMPUTER = 'computer'
}
