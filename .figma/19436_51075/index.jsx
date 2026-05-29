import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.contents2}>
      <img
        src="../image/mpqov3bj-892sk59.svg"
        className={styles.imagesBusinessSectio}
      />
      <div className={styles.title}>
        <div className={styles.contents}>
          <p className={styles.materials}>Materials</p>
          <p className={styles.uLvacIsASourceOfElec}>
            ULVAC is a source of electric materials, such as sputtering targets, for
            diverse industries. In addition, in the high-performance materials
            sector, ULVAC is a source of integrated manufacturing and precision
            processing technologies for titanium, tantalum, zirconium, niobium, etc.
          </p>
        </div>
        <div className={styles.buttonSp}>
          <p className={styles.superMiniaturization}>View Details</p>
          <div className={styles.icon}>
            <img src="../image/mpqov3bj-bjmmd8u.svg" className={styles.openInNew} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
