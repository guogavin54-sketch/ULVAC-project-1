import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.tab}>
      <p className={styles.text}>Overview</p>
      <p className={styles.text2}>Our Business</p>
      <p className={styles.text}>R&D</p>
      <p className={styles.text}>Group Companies</p>
    </div>
  );
}

export default Component;
