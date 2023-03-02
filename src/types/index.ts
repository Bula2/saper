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
  NINE,
  BOMB
}

export enum CellState {
  OPEN,
  VISIBLE,
  FLAG
}

export type Cell = {value: CellValue, state: CellState}