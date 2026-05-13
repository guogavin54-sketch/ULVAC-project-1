import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section}>
      <p className={styles.uLvacOperatesBusines}>
        ULVAC Operates Businesses in Six Areas
      </p>
      <div className={styles.container}>
        <div className={styles.accordionSp}>
          <p className={styles.semiconductorAndElec}>
            Semiconductor and Electronic Device Production Equipment
          </p>
          <img src="../image/mp3rp31x-04rw72x.svg" className={styles.expandMore} />
        </div>
        <div className={styles.accordionSp2}>
          <p className={styles.semiconductorAndElec2}>Industrial Equipment</p>
          <img src="../image/mp3rp31x-04rw72x.svg" className={styles.expandMore} />
        </div>
        <div className={styles.accordionSp}>
          <p className={styles.semiconductorAndElec}>
            Display and Energy-Related Production Equipment
          </p>
          <img src="../image/mp3rp31x-04rw72x.svg" className={styles.expandMore} />
        </div>
        <div className={styles.accordionSp2}>
          <p className={styles.semiconductorAndElec2}>Components</p>
          <img src="../image/mp3rp31x-04rw72x.svg" className={styles.expandMore} />
        </div>
        <div className={styles.accordionSp2}>
          <p className={styles.semiconductorAndElec2}>Materials</p>
          <img src="../image/mp3rp31x-04rw72x.svg" className={styles.expandMore} />
        </div>
        <div className={styles.accordionSp}>
          <p className={styles.semiconductorAndElec}>
            Vacuum Application Business (Surface analysis・Coating)
          </p>
          <img src="../image/mp3rp31x-04rw72x.svg" className={styles.expandMore} />
        </div>
      </div>
      <div className={styles.buttonSp}>
        <p className={styles.superMiniaturization}>See Business Overview</p>
        <img src="../image/mp3rp31x-692io8y.svg" className={styles.expandMore} />
      </div>
    </div>
  );
}

export default Component;
