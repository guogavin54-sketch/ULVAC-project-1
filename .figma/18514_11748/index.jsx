import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.accordionSp}>
      <div className={styles.title}>
        <p className={styles.semiconductorAndElec}>
          Semiconductor and Electronic Device Production Equipment
        </p>
        <img src="../image/mp5cquul-55atrop.svg" className={styles.expandLess} />
      </div>
      <p className={styles.superMiniaturization}>
        Super-miniaturization technologies delivering products that support societal
        progress through high-performance devices
      </p>
      <img src="../image/mp5cquul-vc7whzy.png" className={styles.card2} />
    </div>
  );
}

export default Component;
