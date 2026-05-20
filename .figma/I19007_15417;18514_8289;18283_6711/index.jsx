import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.cardMap}>
      <img
        src="../image/mpdv7lt4-hbcolem.svg"
        className={styles.imagesMapSection}
      />
      <div className={styles.contents}>
        <p className={styles.japan}>Japan</p>
        <div className={styles.detail}>
          <p className={styles.salesService35Rd4Man3}>
            <span className={styles.salesService35Rd4Man}>
              Sales＆Service:&nbsp;
            </span>
            <span className={styles.salesService35Rd4Man2}>
              35
              <br />
            </span>
            <span className={styles.salesService35Rd4Man}>R&D:&nbsp;</span>
            <span className={styles.salesService35Rd4Man2}>
              4<br />
            </span>
            <span className={styles.salesService35Rd4Man}>
              Manufacturing:&nbsp;
            </span>
            <span className={styles.salesService35Rd4Man2}>11</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Component;
