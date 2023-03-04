import {Cell, CellState, CellValue} from "../types";
import {columnsCount, rowsCount} from "../variables";
import {findCellsAround} from "./find-cells-around";

export const getCells = (): Cell[][] => {
  let cells: Cell[][] = [];

  //заполнение закрытых клеток
  for (let i = 0; i < rowsCount; i++) {
    cells.push([])
    for (let j = 0; j < columnsCount; j++) {
      cells[i].push({
        value: CellValue.NONE,
        state: CellState.CLOSE
      })
    }
  }

  //Заполнение бомб
  const bombsCount = 40;
  let bombsInCells = 0;

  while (bombsInCells < bombsCount) {
    const row = Math.floor(Math.random() * rowsCount)
    const column = Math.floor(Math.random() * columnsCount)
    const currentCell = cells[row][column]
    if (currentCell.value !== CellValue.BOMB) {
      cells = cells.map((rowEl, rowIndex) => rowEl.map((cellEl, cellIndex) => {
        if (row === rowIndex && column === cellIndex) {
          return {
            ...cellEl,
            value: CellValue.BOMB
          }
        }
        return cellEl
      }))
    }
    bombsInCells++;
  }

  //количество бомб рядом в открытой клетке
  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < columnsCount; j++) {
      const currentCell = cells[i][j];
      if (currentCell.value === CellValue.BOMB) {
        continue;
      }

      let bombsCount = 0;
      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell
      } = findCellsAround(cells, i, j)

      if (topLeftCell?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (topCell?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (topRightCell?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (leftCell?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (rightCell?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (bottomLeftCell?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (bottomCell?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (bottomRightCell?.value === CellValue.BOMB) {
        bombsCount++;
      }

      if (bombsCount > 0) {
        cells[i][j] = {...currentCell, value: bombsCount}
      }
    }
  }
  return cells;
}

const openEmptyCell = (cells: Cell[][], row: number, col: number) => {

}