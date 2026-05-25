import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.sPMenu}>
      <div className={styles.contents}>
        <div className={styles.title}>
          <img src="../image/mpklcx7e-lvt1b6y.svg" className={styles.close} />
        </div>
        <div className={styles.list}>
          <div className={styles.item}>
            <p className={styles.home}>About ULVAC</p>
          </div>
          <div className={styles.item}>
            <p className={styles.home}>News</p>
          </div>
          <div className={styles.item}>
            <p className={styles.home}>Investor Relations</p>
          </div>
          <div className={styles.item}>
            <p className={styles.home}>Contact</p>
          </div>
        </div>
      </div>
      <div className={styles.buttonLanguageSp}>
        <div className={styles.title2}>
          <div className={styles.icon}>
            <img src="../image/mpklcx7e-ryha4ji.svg" className={styles.language} />
          </div>
          <p className={styles.text}>English</p>
        </div>
        <img src="../image/mpklcx7e-pl7d2mt.svg" className={styles.expandMore} />
      </div>
    </div>
  );
}

export default Component;
