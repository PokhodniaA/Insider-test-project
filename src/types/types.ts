import {GameUser} from "@/types/enums";

export type TotalWeight = { [key in GameUser]: number }

export type UpdateTotalWeight = {
  type: GameUser;
  weight: number
}

export type Params = {
  x: number,
  y: number
}

export type Sizes = {
  width: number,
  height: number
}
