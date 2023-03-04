import {Cell} from "../types";
import {columnsCount, rowsCount} from "../variables";
export const findCellsAround = (cells: Cell[][], row: number, col: number) => {
  const topLeftCell = row > 0 && col > 0 ? cells[row - 1][col - 1] : null;
  const topCell = row > 0 ? cells[row - 1][col] : null;
  const topRightCell = row > 0 && col < columnsCount - 1 ? cells[row - 1][col + 1] : null;
  const leftCell = col > 0 ? cells[row][col - 1] : null;
  const rightCell = col < columnsCount - 1 ? cells[row][col + 1] : null;
  const bottomLeftCell = row < rowsCount - 1 && col > 0 ? cells[row + 1][col - 1] : null;
  const bottomCell = row < rowsCount - 1 ? cells[row + 1][col] : null;
  const bottomRightCell = row < rowsCount - 1 && col < columnsCount - 1 ? cells[row + 1][col + 1] : null;
  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell
  }
}