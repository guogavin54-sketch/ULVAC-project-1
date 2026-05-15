import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section}>
      <p className={styles.uLvacMainBases}>ULVAC Main Bases</p>
      <div className={styles.mapJapanSp}>
        <div className={styles.dotJapan1}>
          <div className={styles.locationSp}>
            <div className={styles.ellipseBg1}>
              <div className={styles.ellipse} />
            </div>
          </div>
          <div className={styles.autoWrapper}>
            <div className={styles.locationSp2}>
              <div className={styles.ellipseBg1}>
                <div className={styles.ellipse} />
              </div>
            </div>
            <div className={styles.locationSp3}>
              <div className={styles.ellipseBg1}>
                <div className={styles.ellipse} />
              </div>
            </div>
          </div>
          <div className={styles.locationSp4}>
            <div className={styles.ellipseBg1}>
              <div className={styles.ellipse} />
            </div>
          </div>
          <div className={styles.autoWrapper2}>
            <div className={styles.locationSp5}>
              <div className={styles.ellipseBg1}>
                <div className={styles.ellipse} />
              </div>
            </div>
            <div className={styles.ellipse2} />
            <div className={styles.ellipseBg12}>
              <div className={styles.ellipse2} />
            </div>
            <div className={styles.ellipseBg2}>
              <div className={styles.ellipseBg12}>
                <div className={styles.ellipse2} />
              </div>
            </div>
            <div className={styles.ellipseBg3}>
              <div className={styles.ellipseBg2}>
                <div className={styles.ellipseBg12}>
                  <div className={styles.ellipse2} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.locationSp6}>
            <div className={styles.ellipseBg1}>
              <div className={styles.ellipse} />
            </div>
          </div>
        </div>
        <img src="../image/mp6qv9jv-88x9cqn.png" className={styles.containerSp} />
      </div>
      <div className={styles.button}>
        <p className={styles.superMiniaturization}>See All Group Companies</p>
        <img src="../image/mp6qv9jv-jc3gpui.svg" className={styles.chevronRight} />
      </div>
    </div>
  );
}

export default Component;
