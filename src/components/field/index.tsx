import React from 'react';
import styles from "./field.module.scss"
import NumberDisplay from "../number-display";
import SmileDisplay from "../smile-display";

const Field: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <NumberDisplay value={30}/>
        <SmileDisplay/>
        <NumberDisplay value={0}/>
      </div>
      <div className={styles.body}>
        body
      </div>
    </div>
  );
}

export default Field;
