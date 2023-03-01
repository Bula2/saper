import React from 'react';
import styles from "./number-display.module.scss"

export interface INumberDisplay {
  value: number;
}
const NumberDisplay: React.FC<INumberDisplay> = ({value}) => {
  const numbers = {
    0: "/images/0.png",
    1: "/images/1.png",
    2: "/images/2.png",
    3: "/images/3.png",
    4: "/images/4.png",
    5: "/images/5.png",
    6: "/images/6.png",
    7: "/images/7.png",
    8: "/images/8.png",
    9: "/images/9.png",
  };
  const showNumbers = value.toString().padStart(3, "0").split("");
  return (
    <div className={styles.wrapper}>
      {showNumbers.map((it, key) => {
        return (
          <img key={key} className={styles.number} src={numbers[Number(it) as keyof typeof numbers]} alt={it}/>
        )
      })}
    </div>
  );
};

export default NumberDisplay;