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

export enum Face {
  BROKE= "/images/broke.png",
  COOL = "/images/cool.png",
  SHOCKED = "/images/shocked.png",
  SMILE = "/images/smile.png",
}