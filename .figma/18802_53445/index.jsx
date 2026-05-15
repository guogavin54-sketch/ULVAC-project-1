import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.map}>
      <p className={styles.uLvacMainBases}>ULVAC Main Bases</p>
      <div className={styles.button}>
        <p className={styles.superMiniaturization}>See All Group Companies</p>
        <img src="../image/mp6lowg1-g7lhyj5.svg" className={styles.chevronRight} />
      </div>
      <img src="../image/mp6lowg1-o4zh5eq.png" className={styles.mapJapan} />
    </div>
  );
}

export default Component;
