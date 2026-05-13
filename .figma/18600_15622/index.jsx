import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.headerSp}>
      <div className={styles.logo}>
        <img
          src="../image/mp3vohfg-e4fs0z2.png"
          className={styles.uLvaclogoBlue1}
        />
        <p className={styles.global}>Global</p>
      </div>
      <img src="../image/mp3vohff-f8dpiv6.svg" className={styles.menu} />
    </div>
  );
}

export default Component;
