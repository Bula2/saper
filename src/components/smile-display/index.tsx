import React from 'react';
import styles from "./smile-display.module.scss"
import {Face} from "../../types";

export interface ISmileDisplay {
  type: Face;
  onClick: () => void;
}
const SmileDisplay: React.FC<ISmileDisplay> = ({type, onClick}) => {
  return (
    <div className={styles.wrapper} onClick={() => onClick()}>
      <img className={styles.smile} src={type} alt="smile"/>
    </div>
  );
};

export default SmileDisplay;