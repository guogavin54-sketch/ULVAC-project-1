import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
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
      <div className={styles.contents}>
        <div className={styles.icon}>
          <img src="../image/mpntdbn4-hfds5hb.svg" className={styles.chevronLeft} />
        </div>
        <img src="../image/mpntdbn4-w3qoexe.png" className={styles.containerSp} />
        <div className={styles.icon}>
          <img src="../image/mpntdbn4-rfqmk14.svg" className={styles.chevronLeft} />
        </div>
      </div>
    </div>
  );
}

export default Component;
