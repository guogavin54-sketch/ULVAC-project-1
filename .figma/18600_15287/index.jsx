import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            src="../image/mp2filj8-0e31bhh.png"
            className={styles.uLvaclogoBlue1}
          />
          <p className={styles.global}>Global</p>
        </div>
        <div className={styles.navigation}>
          <p className={styles.home}>About ULVAC</p>
          <p className={styles.home2}>News</p>
          <p className={styles.home3}>Investor Relations</p>
          <p className={styles.home4}>Contact</p>
        </div>
        <div className={styles.buttonLanguage}>
          <div className={styles.title}>
            <div className={styles.icon}>
              <img
                src="../image/mp2filj7-ku4h7zg.svg"
                className={styles.language}
              />
            </div>
            <p className={styles.text}>English</p>
          </div>
          <img src="../image/mp2filj7-1zx4xzr.svg" className={styles.expandMore} />
        </div>
      </div>
    </div>
  );
}

export default Component;
