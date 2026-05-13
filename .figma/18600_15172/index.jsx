import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.contents}>
      <div className={styles.containerTitle}>
        <p className={styles.uLvacOperatesBusines}>
          ULVAC Operates Businesses in Six Areas
        </p>
        <div className={styles.button}>
          <p className={styles.superMiniaturization}>See Business Overview</p>
          <img
            src="../image/mp3of2uw-w954ent.svg"
            className={styles.chevronRight}
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.containerCard}>
          <div className={styles.card}>
            <img src="../image/mp3of2uw-ji943a6.svg" className={styles.maskGroup} />
            <div className={styles.text}>
              <p className={styles.semiconductorAndElec}>
                Semiconductor and Electronic Device Production Equipment
              </p>
              <p className={styles.superMiniaturization2}>
                Super-miniaturization technologies delivering products that support
                societal progress through high-performance devices
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="../image/mp3of2uw-j0c9n5y.svg" className={styles.maskGroup} />
            <div className={styles.text}>
              <p className={styles.semiconductorAndElec}>Industrial Equipment</p>
              <p className={styles.superMiniaturization2}>
                Solutions across wide-ranging industries, including automobile,
                pharmaceutical, and food
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="../image/mp3of2uw-qp377u9.svg" className={styles.maskGroup} />
            <div className={styles.text}>
              <p className={styles.semiconductorAndElec}>
                Display and Energy-Related Production Equipment
              </p>
              <p className={styles.superMiniaturization2}>
                Coating and processing solutions for various materials including
                glass substrates, plastics, and films
              </p>
            </div>
          </div>
        </div>
        <div className={styles.containerCard}>
          <div className={styles.card}>
            <img src="../image/mp3of2uw-hufbwct.svg" className={styles.maskGroup} />
            <div className={styles.text}>
              <p className={styles.semiconductorAndElec}>Components</p>
              <p className={styles.superMiniaturization2}>
                Vacuum pumps, measurement and analysis equipment, power generators,
                and vacuum valves
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="../image/mp3of2uw-wnar2d8.svg" className={styles.maskGroup} />
            <div className={styles.text}>
              <p className={styles.semiconductorAndElec}>Materials</p>
              <p className={styles.superMiniaturization2}>
                Electric materials, such as sputtering targets, and
                precision-processed metals for diverse applications
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="../image/mp3of2uw-8hc02rn.svg" className={styles.maskGroup} />
            <div className={styles.text}>
              <p className={styles.semiconductorAndElec}>
                Vacuum Application Business (Surface analysis・Coating)
              </p>
              <p className={styles.superMiniaturization2}>
                Surface analysis and coating — technology derived from vacuum-based
                production equipment for diverse industries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
