import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.buttonLanguage}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <img src="../image/mpkl1ufj-xo2y7h6.svg" className={styles.language} />
        </div>
        <p className={styles.text}>English</p>
      </div>
      <img src="../image/mpkl1ufj-7b38qx6.svg" className={styles.expandMore} />
    </div>
  );
}

export default Component;
