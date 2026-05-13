import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section}>
      <p className={styles.featuredNews}>Featured News</p>
      <div className={styles.news2}>
        <div className={styles.cardNews}>
          <img src="../image/mp3nonxw-rfmy5pd.png" className={styles.thumbnail} />
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
        <div className={styles.news}>
          <div className={styles.cardNewsSmall}>
            <div className={styles.thumbnail2}>
              <div className={styles.subtract}>
                <img src="../image/mp3nonxw-tr520ii.svg" className={styles.eNg} />
              </div>
            </div>
            <div className={styles.text}>
              <p className={styles.date}>2025.11.21</p>
              <p className={styles.uLvacReceivesBestPar}>
                ULVAC Receives "Best Partner Award" from SK hynix
              </p>
              <div className={styles.tag2}>
                <p className={styles.corporate}>Corporate</p>
              </div>
            </div>
          </div>
          <div className={styles.cardNewsSmall2}>
            <img
              src="../image/mp3nonxw-hglo77l.png"
              className={styles.thumbnail3}
            />
            <div className={styles.text2}>
              <p className={styles.date}>2025.04.01</p>
              <p className={styles.uLvacReceivesBestPar}>
                ULVAC Recognized with CDP "Climate Change 2024" and "Water Security
                2024...
              </p>
              <div className={styles.tag3}>
                <p className={styles.sustainability}>Sustainability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <p className={styles.superMiniaturization}>See All News</p>
        <img src="../image/mp3nonxw-gukovq0.svg" className={styles.chevronRight} />
      </div>
    </div>
  );
}

export default Component;
