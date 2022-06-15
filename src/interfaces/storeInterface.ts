// TODO: Refactor interfaces

export interface IState {
    gameStatus: GameStatus,
    game: IGameState|null
}

export interface IGameState {
    score: number,
    level: number,
    power: {
        user: number,
        computer: number
    }
}

export enum GameStatus {
    PAUSE = 'pause',
    PLAY = 'play'
}
