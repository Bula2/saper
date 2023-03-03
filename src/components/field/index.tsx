import React, {ReactNode, useEffect, useState} from 'react';
import styles from "./field.module.scss"
import NumberDisplay from "../number-display";
import SmileDisplay from "../smile-display";
import {getCells} from "../../utils";
import Cell from "../cell";
import {Cell as CellType, CellState, CellValue, Face} from "../../types"

const Field: React.FC = () => {
  const [cells, setCells] = useState<CellType[][]>(getCells());
  const [time, setTime] = useState<number>(0);
  const [face, setFace] = useState<Face>(Face.SMILE);
  const [game, setGame] = useState<boolean>(false);
  const [bombCount, setBombCount] = useState<number>(40)

  const cellClick = (row: number, col: number) => {
    if (!game) {
      setGame(true);
    }

    const currentCell = cells[row][col];
    const currentCellsCopy = cells.slice();

    if (
      currentCell.state === CellState.FLAG ||
      currentCell.state === CellState.QUESTION ||
      currentCell.state === CellState.OPEN
    ) {
      return;
    }
    if (currentCell.value == CellValue.BOMB) {

    } else if (currentCell.value === CellValue.NONE) {

    } else {
      currentCellsCopy[row][col].state = CellState.OPEN
    }
  }

  const faceClick = () => {
    if (game) {
      const answer = window.confirm("Начать игру заново?");
      if (answer) {
        setGame(false);
        setTime(0);
        setBombCount(40);
        setCells(getCells());
      }
    }
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
      <div className={styles.body}>
        {generateCells()}
      </div>
    </div>
  );
}

export default Field;
