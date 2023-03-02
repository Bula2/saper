import {Cell, CellState, CellValue} from "../types";

export const getCells = (): Cell[][] => {
  const columnsCount = 16;
  const rowsCount = 16;
  let cells: Cell[][] = [];

  //заполнение закрытых клеток
  for (let i = 0; i < rowsCount; i++) {
    cells.push([])
    for (let j = 0; j < columnsCount; j++) {
      cells[i].push({
        value: CellValue.NONE,
        state: CellState.OPEN
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
      const topLeftBomb = i > 0 && j > 0 ? cells[i - 1][j - 1] : null;
      const topBomb = i > 0 ? cells[i - 1][j] : null;
      const topRightBomb = i > 0 && j < columnsCount - 1 ? cells[i - 1][j + 1] : null;
      const leftBomb = j > 0 ? cells[i][j - 1] : null;
      const rightBomb = j < columnsCount - 1 ? cells[i][j + 1] : null;
      const bottomLeftBomb = i < rowsCount - 1 && j > 0 ? cells[i + 1][j - 1] : null;
      const bottomBomb = i < rowsCount - 1 ? cells[i + 1][j] : null;
      const bottomRightBomb = i < rowsCount - 1 && j < columnsCount - 1 ? cells[i + 1][j + 1] : null;

      if (topLeftBomb?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (topBomb?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (topRightBomb?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (leftBomb?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (rightBomb?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (bottomLeftBomb?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (bottomBomb?.value === CellValue.BOMB) {
        bombsCount++;
      }
      if (bottomRightBomb?.value === CellValue.BOMB) {
        bombsCount++;
      }

      if (bombsCount > 0) {
        cells[i][j] = {...currentCell, value: bombsCount}
      }
    }
  }
  return cells;
}