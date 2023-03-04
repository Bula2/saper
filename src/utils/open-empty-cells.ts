import {Cell, CellState, CellValue} from "../types";
import {findCellsAround} from "./find-cells-around";

export const openEmptyCells = (cells: Cell[][], row: number, col: number) => {
  let newCells = cells.slice();
  newCells[row][col].state = CellState.OPEN;
  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell
  } = findCellsAround(cells, row, col)

  if (topLeftCell?.state === CellState.CLOSE && topLeftCell?.value !== CellValue.BOMB ){
      if(topLeftCell.value === CellValue.NONE) {
        newCells = openEmptyCells(newCells, row-1, col-1)
      } else {
        newCells[row-1][col-1].state = CellState.OPEN
      }
  }

  if (topCell?.state === CellState.CLOSE && topCell?.value !== CellValue.BOMB ){
    if(topCell.value === CellValue.NONE) {
      newCells = openEmptyCells(newCells, row-1, col)
    } else {
      newCells[row-1][col].state = CellState.OPEN
    }
  }

  if (topRightCell?.state === CellState.CLOSE && topRightCell?.value !== CellValue.BOMB ){
    if(topRightCell.value === CellValue.NONE) {
      newCells = openEmptyCells(newCells, row-1, col+1)
    } else {
      newCells[row-1][col+1].state = CellState.OPEN
    }
  }

  if (leftCell?.state === CellState.CLOSE && leftCell?.value !== CellValue.BOMB ){
    if(leftCell.value === CellValue.NONE) {
      newCells = openEmptyCells(newCells, row, col-1)
    } else {
      newCells[row][col-1].state = CellState.OPEN
    }
  }

  if (rightCell?.state === CellState.CLOSE && rightCell?.value !== CellValue.BOMB ){
    if(rightCell.value === CellValue.NONE) {
      newCells = openEmptyCells(newCells, row, col+1)
    } else {
      newCells[row][col+1].state = CellState.OPEN
    }
  }

  if (bottomLeftCell?.state === CellState.CLOSE && bottomLeftCell?.value !== CellValue.BOMB ){
    if(bottomLeftCell.value === CellValue.NONE) {
      newCells = openEmptyCells(newCells, row+1, col-1)
    } else {
      newCells[row+1][col-1].state = CellState.OPEN
    }
  }

  if (bottomCell?.state === CellState.CLOSE && bottomCell?.value !== CellValue.BOMB ){
    if(bottomCell.value === CellValue.NONE) {
      newCells = openEmptyCells(newCells, row+1, col)
    } else {
      newCells[row+1][col].state = CellState.OPEN
    }
  }

  if (bottomRightCell?.state === CellState.CLOSE && bottomRightCell?.value !== CellValue.BOMB ){
    if(bottomRightCell.value === CellValue.NONE) {
      newCells = openEmptyCells(newCells, row+1, col+1)
    } else {
      newCells[row+1][col+1].state = CellState.OPEN
    }
  }

  return newCells;
}