import React, {ReactNode, useState} from 'react';
import styles from "./field.module.scss"
import NumberDisplay from "../number-display";
import SmileDisplay from "../smile-display";
import {getCells} from "../../utils";
import Cell from "../cell";

const Field: React.FC = () => {
  const [cells, setCells] = useState(getCells());

  const generateCells = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        return (
          <Cell
            key={cellIndex + rowIndex}
            state={cell.state}
            value={cell.value}
            row={rowIndex}
            column={cellIndex}
          />
        )
      })
    )
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <NumberDisplay value={40}/>
        <SmileDisplay/>
        <NumberDisplay value={0}/>
      </div>
      <div className={styles.body}>
        {generateCells()}
      </div>
    </div>
  );
}

export default Field;
