import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section}>
      <div className={styles.bG}>
        <div className={styles.eclipse} />
        <div className={styles.rectangle29} />
      </div>
      <img src="../image/mp5bncnn-6l3o6sw.png" className={styles.image40} />
      <img src="../image/mp5bncnn-5t6jjwl.png" className={styles.texture} />
      <div className={styles.container}>
        <div className={styles.text}>
          <p className={styles.uLvacvaluereport2025}>ULVAC VALUE REPORT 2025</p>
          <p className={styles.superMiniaturization}>
            Our approach to sustainable growth and long-term value creation
          </p>
        </div>
        <div className={styles.button}>
          <p className={styles.superMiniaturization2}>View Report</p>
          <img
            src="../image/mp5bncnl-vl21v0e.svg"
            className={styles.chevronRight}
          />
        </div>
      </div>
    </div>
  );
}

export default Component;
