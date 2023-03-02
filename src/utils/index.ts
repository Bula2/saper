import {Cell, CellState, CellValue} from "../types";
export const getCells = (): Cell[][] => {
  const columnsCount = 16;
  const rowsColumn = 16;
  const cells: Cell[][] = [];
  for (let i=0; i < rowsColumn; i++){
    cells.push([])
    for (let j=0; j < columnsCount; j++){
      cells[i].push({
        value: CellValue.NONE,
        state: CellState.OPEN
      })
    }
  }
  return cells;
}