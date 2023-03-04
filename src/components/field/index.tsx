import React, {ReactNode, useEffect, useState} from 'react';
import styles from "./field.module.scss"
import cx from "classnames"
import NumberDisplay from "../number-display";
import SmileDisplay from "../smile-display";
import {getCells} from "../../utils/get-cells";
import Cell from "../cell";
import {Cell as CellType, CellState, CellValue, Face} from "../../types"
import {openEmptyCells} from "../../utils/open-empty-cells";
import {bombsCount, columnsCount, rowsCount} from "../../variables";

const Field: React.FC = () => {
  const [cells, setCells] = useState<CellType[][]>(getCells());
  const [time, setTime] = useState<number>(0);
  const [face, setFace] = useState<Face>(Face.SMILE);
  const [game, setGame] = useState<boolean>(false);
  const [bombCount, setBombCount] = useState<number>(bombsCount);
  const [loss, setLoss] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);

  const cellClick = (row: number, col: number) => {
    let currentCellsCopy = cells.slice();

    if (!game) {
      if (currentCellsCopy[row][col].value === CellValue.BOMB) {
        let isBomb = true;
        while (isBomb) {
          currentCellsCopy = getCells();
          if (currentCellsCopy[row][col].value !== CellValue.BOMB) {
            isBomb = false;
            break;
          }
        }
        setCells(currentCellsCopy);
      }
      setGame(true);
    }

    const currentCell = currentCellsCopy[row][col];

    if (
      currentCell.state === CellState.FLAG ||
      currentCell.state === CellState.QUESTION ||
      currentCell.state === CellState.OPEN
    ) {
      return;
    }

    if (currentCell.value == CellValue.BOMB) {
      setLoss(true);
      showBombs(currentCell);
      return;
    } else if (currentCell.value === CellValue.NONE) {
      currentCellsCopy = openEmptyCells(currentCellsCopy, row, col)
    } else {
      currentCellsCopy[row][col].state = CellState.OPEN
    }

    let closeCellsExists = false;
    for (let i = 0; i < rowsCount; i++) {
      for (let j = 0; j < columnsCount; j++) {
        const currentCell = currentCellsCopy[i][j];
        if (currentCell.value !== CellValue.BOMB && currentCell.state === CellState.CLOSE) {
          closeCellsExists = true;
          break;
        }
      }
    }

    if (!closeCellsExists) {
      currentCellsCopy = currentCellsCopy.map(row => row.map(cell => {
        if (cell.value === CellValue.BOMB) {
          setBombCount(0)
          cell.state = CellState.FLAG;
        }
        return cell;
      }))
      setWin(true);
    }

    setCells(currentCellsCopy);
  }

  const faceClick = () => {
    setGame(false);
    setTime(0);
    setBombCount(bombsCount);
    setCells(getCells());
    setLoss(false);
    setFace(Face.SMILE)
    setWin(false);
  }

  const addShockedFace = () => {
    setFace(Face.SHOCKED)
  }

  const addSmileFace = () => {
    setFace(Face.SMILE)
  }

  const addHelpers = (row: number, col: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!game) {
      return;
    }
    const currentCell = cells[row][col];
    const currenCellsCopy = cells.slice()
    if (currentCell.state === CellState.CLOSE && bombCount > 0) {
      currenCellsCopy[row][col].state = CellState.FLAG;
      setCells(currenCellsCopy)
      bombCount > 0 && setBombCount(bombCount - 1)
    } else if (currentCell.state === CellState.FLAG) {
      currenCellsCopy[row][col].state = CellState.QUESTION;
      setCells(currenCellsCopy)
      setBombCount(bombCount + 1)
    } else if (currentCell.state !== CellState.OPEN) {
      currenCellsCopy[row][col].state = CellState.CLOSE;
      setCells(currenCellsCopy)
    }
  }

  const showBombs = (currentCell: CellType) => {
    const currenCellsCopy = cells.slice();
    setCells(currenCellsCopy.map(row => row.map(cell => {
      if (cell === currentCell) {
        cell.value = CellValue.RED_BOMB
      }
      if (cell.value === CellValue.BOMB || cell.value === CellValue.RED_BOMB) {
        cell.state = CellState.OPEN
      }
      return cell
    })))
  }

  useEffect(() => {
    if (game && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000)
      return () => {
        clearInterval(timer);
      }
    }
  }, [game, time])

  useEffect(() => {
    if (loss) {
      setBombCount(0);
      setFace(Face.BROKE);
      setGame(false);
    }
  }, [loss])

  useEffect(() => {
    if (win) {
      setGame(false);
      setFace(Face.COOL);
    }
  }, [win])

  const generateCells = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        return (
          <Cell
            key={cellIndex + rowIndex}
            state={cell.state}
            onClick={cellClick}
            value={cell.value}
            row={rowIndex}
            column={cellIndex}
            addShockedFace={addShockedFace}
            addSmileFace={addSmileFace}
            addHelpers={addHelpers}
          />
        )
      })
    )
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <NumberDisplay value={bombCount}/>
        <SmileDisplay type={face} onClick={faceClick}/>
        <NumberDisplay value={time}/>
      </div>
      <div className={cx(styles.body, (loss || win) && styles.stop_game)}>
        {generateCells()}
      </div>
    </div>
  );
}

export default Field;
