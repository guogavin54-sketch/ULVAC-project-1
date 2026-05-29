import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.contents}>
      <div className={styles.container}>
        <div className={styles.card}>
          <img src="../image/mpq9ubvt-xvvayqj.svg" className={styles.sales} />
          <div className={styles.title}>
            <div className={styles.text}>
              <p className={styles.a}>¥</p>
              <p className={styles.a2512B}>251.2B</p>
            </div>
            <p className={styles.netSales}>net sales</p>
          </div>
        </div>
        <div className={styles.card2}>
          <img src="../image/mpq9ubvt-dpk435t.svg" className={styles.sales} />
          <div className={styles.title2}>
            <p className={styles.a2512B}>6,132</p>
            <p className={styles.netSales}>group employees worldwide​</p>
          </div>
        </div>
        <div className={styles.card3}>
          <img src="../image/mpq9ubvt-ehfp3g9.svg" className={styles.sales} />
          <div className={styles.title3}>
            <p className={styles.a2512B}>41</p>
            <p className={styles.netSales}>group companies</p>
          </div>
        </div>
        <div className={styles.card4}>
          <img src="../image/mpq9ubvt-zr9bhox.svg" className={styles.sales} />
          <div className={styles.title4}>
            <div className={styles.text2}>
              <p className={styles.a}>¥</p>
              <p className={styles.a2512B}>22.8B</p>
            </div>
            <p className={styles.rDCapitalExpenditure}>R&D capital expenditure</p>
          </div>
        </div>
      </div>
      <p className={styles.aAsOfFy2025EndedJune}>
        *As of FY2025 (ended June 2025)​
      </p>
    </div>
  );
}

export default Component;
