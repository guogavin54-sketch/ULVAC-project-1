import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.container3}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          <img src="../image/mq64vtc4-hh0t5v9.png" className={styles.imageTsmc} />
        </div>
        <div className={styles.container}>
          <p className={styles.date}>2025.12.25</p>
          <p className={styles.uLvacReceivesThe2025}>
            ULVAC Receives the "2025 TSMC Excellent Performance Award."
          </p>
          <div className={styles.tag}>
            <p className={styles.corporate}>Corporate</p>
          </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.thumbnail2}>
          <img
            src="../image/mq64vtc4-2ofubeg.png"
            className={styles.imageSkhynix}
          />
        </div>
        <div className={styles.container}>
          <p className={styles.date}>2025.11.21</p>
          <p className={styles.uLvacReceivesThe2025}>
            ULVAC Receives "Best Partner Award" from SK hynix
          </p>
          <div className={styles.tag}>
            <p className={styles.corporate}>Corporate</p>
          </div>
        </div>
      </div>
      <div className={styles.card3}>
        <div className={styles.thumbnail3}>
          <img src="../image/mq64vtc4-27jbu9c.png" className={styles.imageCdp} />
        </div>
        <div className={styles.container2}>
          <p className={styles.date}>2025.04.01</p>
          <p className={styles.uLvacReceivesThe2025}>
            ULVAC Recognized with CDP "Climate Change 2024" and "Water Security
            2024" B Score
          </p>
          <div className={styles.tag2}>
            <p className={styles.sustainability}>Sustainability</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
