import React from 'react';
import styles from "./smile-display.module.scss"
const SmileDisplay: React.FC = () => {
  const smiles = {
    broke: "/images/broke.png",
    cool: "/images/cool.png",
    dead: "/images/dead.png",
    smile: "/images/smile.png",
  }
  return (
    <div className={styles.wrapper}>
      <img className={styles.smile} src={smiles.broke} alt="smile"/>
    </div>
  );
};

export default SmileDisplay;