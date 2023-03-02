export enum CellValue {
  NONE,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  BOMB
}

export enum CellState {
  CLOSE,
  OPEN,
  FLAG,
  QUESTION
}

export type Cell = {value: CellValue, state: CellState}