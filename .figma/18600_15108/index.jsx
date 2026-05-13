import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.title}>
      <div className={styles.frame15}>
        <p className={styles.vacuumTechnologyPowe}>
          ULVAC, Global Leader in Vacuum Technology for Over 70 Years&nbsp;
        </p>
        <p className={styles.asUlvacManufacturesP}>
          Our advanced technologies support industrial manufacturers with solutions
          centered around our proprietary vacuum technology, playing an important
          role in areas of global strategic significance, including advanced
          semiconductor electronics, rare earth magnet manufacturing, and extreme
          cooling technologies for quantum computing.&nbsp;
        </p>
      </div>
      <div className={styles.button}>
        <p className={styles.superMiniaturization}>Learn More About ULVAC</p>
        <img src="../image/mp3okx8c-egr82u9.svg" className={styles.chevronRight} />
      </div>
    </div>
  );
}

export default Component;
