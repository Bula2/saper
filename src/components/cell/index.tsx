import React, {ReactNode} from 'react';
import styles from "./cell.module.scss"
import {CellState, CellValue} from "../../types";
import cx from "classnames";
import {bombsCount} from "../../assets";

export interface ICell {
  row: number;
  column: number;
  state: CellState;
  value: CellValue;
  onClick: (row: number, col: number) => void;
  addShockedFace: () => void;
  addSmileFace: () => void;
  addHelpers: (row: number, col: number) => (e: React.MouseEvent) => void;
}

const Cell: React.FC<ICell> = (props) => {
  const generateContent = (): ReactNode => {
    if (props.state === CellState.OPEN) {
      if (props.value === CellValue.BOMB) {
        return <img className={styles.img} src={"/images/bomb.png"} alt={"bomb"}/>
      } else if (props.value === CellValue.RED_BOMB) {
        return <img className={styles.img} src={"/images/red-bomb.png"} alt={"bomb"}/>
      } else if (props.value === CellValue.NONE) {
        return null;
      }
      return <img className={styles.img} src={bombsCount[Number(props.value) as keyof typeof bombsCount]}
                  alt={"number"}/>;
    } else if (props.state === CellState.FLAG) {
      return <img className={styles.img} src={"/images/flag.png"} alt={"flag"}/>
    } else if (props.state === CellState.QUESTION) {
      return <img className={styles.img} src={"/images/question.png"} alt={"question"}/>
    } else return null
  }
  return (
    <div
      className={cx(styles.wrapper, props.state === CellState.OPEN && styles.open)}
      onClick={() => props.onClick(props.row, props.column)}
      onContextMenu={props.addHelpers(props.row, props.column)}
      onMouseDown={() => props.addShockedFace()}
      onMouseUp={() => props.addSmileFace()}
      onTouchStart={() => props.addShockedFace()}
      onTouchEnd={() => props.addSmileFace()}
    >
      {generateContent()}
    </div>
  );
};

export default Cell;