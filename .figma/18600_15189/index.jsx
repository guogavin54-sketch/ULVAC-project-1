import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section}>
      <p className={styles.companyProfile}>Company Profile</p>
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.fY2025EndedJune2025}>FY2025 (ended June 2025)</p>
          <img
            src="../image/mp3o3g9u-vkoa1yh.svg"
            className={styles.laptopChromebook}
          />
          <div className={styles.title}>
            <div className={styles.text}>
              <p className={styles.a}>¥</p>
              <p className={styles.a2512B}>251.2B</p>
            </div>
            <p className={styles.netSales}>net sales</p>
          </div>
        </div>
        <div className={styles.card2}>
          <p className={styles.fY2025EndedJune2025}>Group employees worldwide</p>
          <img
            src="../image/mp3o3g9u-jz9q1r2.svg"
            className={styles.laptopChromebook}
          />
          <div className={styles.title2}>
            <p className={styles.a2512B}>6,132</p>
            <p className={styles.netSales}>employees</p>
          </div>
        </div>
        <div className={styles.card3}>
          <p className={styles.fY2025EndedJune2025}>FY2025 (ended June 2025)</p>
          <img
            src="../image/mp3o3g9u-nrx9fvj.svg"
            className={styles.laptopChromebook}
          />
          <div className={styles.title3}>
            <p className={styles.a2512B}>41</p>
            <p className={styles.netSales}>group companies</p>
          </div>
        </div>
        <div className={styles.card4}>
          <p className={styles.fY2025EndedJune2025}>R&D cost</p>
          <img
            src="../image/mp3o3g9u-6t6jvgz.svg"
            className={styles.laptopChromebook}
          />
          <div className={styles.title4}>
            <div className={styles.text2}>
              <p className={styles.a}>¥</p>
              <p className={styles.a2512B}>22.8B</p>
            </div>
            <p className={styles.netSales}>R&D capital expenditure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
