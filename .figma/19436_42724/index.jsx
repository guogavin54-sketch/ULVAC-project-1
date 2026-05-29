import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.buttonCard}>
      <p className={styles.managementStructure}>Organization</p>
      <div className={styles.link}>
        <p className={styles.viewDetails}>View Details</p>
        <img src="../image/mpqm3z3s-nnr19z0.svg" className={styles.chevronRight} />
      </div>
    </div>
  );
}

export default Component;
