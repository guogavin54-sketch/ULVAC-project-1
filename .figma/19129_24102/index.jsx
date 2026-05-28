import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section}>
      <p className={styles.companyProfile}>Company Profile</p>
      <p className={styles.backIn1952UlvacWasSt}>
        When ULVAC was founded back in 1952, vacuum technology had not yet entered
        widespread use in Japan. As a trailblazer, we championed vacuum technology
        by introducing new technologies to the market and addressing the needs of
        customers in diverse industries.
      </p>
      <div className={styles.list}>
        <div className={styles.text}>
          <p className={styles.title}>Name</p>
          <p className={styles.content}>ULVAC, Inc.</p>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>Trademark</p>
          <p className={styles.content}>ULVAC</p>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>ULVAC Head Office / Plant</p>
          <p className={styles.content}>
            2500 Hagisono, Chigasaki, Kanagawa 253-8543, Japan
          </p>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>Established</p>
          <p className={styles.content}>August 23, 1952</p>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>Representative</p>
          <p className={styles.content}>Setsuo Iwashita, President and CEO</p>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>Capital</p>
          <p className={styles.content}>20,873,042,500 yen</p>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>Number of Employees</p>
          <p className={styles.content}>
            1,648, Consolidated: 6,132 (as of 30th June, 2025)
          </p>
        </div>
        <div className={styles.text2}>
          <p className={styles.title}>Business Areas</p>
          <div className={styles.content3}>
            <p className={styles.content2}>
              Development, manufacture, sales, customer support and machinery
              importing/exporting activities related to vacuum equipment, peripheral
              devices, vacuum components and materials for the display,
              semiconductor, electronics, electrics, metals, machinery, automotive,
              chemical, food and pharmaceutical industries
            </p>
          </div>
        </div>
        <div className={styles.text2}>
          <p className={styles.title}>Principal Shareholders</p>
          <div className={styles.content3}>
            <p className={styles.content2}>
              The Master Trust Bank of Japan, Ltd.; Nippon Life Insurance Company;
              BBH (LUX) FOR FIDELITY FUNDS-GLOBAL TECHNOLOGY POOL; Custody Bank of
              Japan, Ltd.; STATE STREET BANK AND TRUST COMPANY 505227; JPMorgan
              Securities Japan Co., Ltd. (as of 30th June, 2025)
            </p>
          </div>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>Banks</p>
          <p className={styles.content}>
            Mizuho Bank, Ltd.; Sumitomo Mitsui Banking Corporation; Nippon Life
            Insurance Company
          </p>
        </div>
      </div>
    </div>
  );
}

export default Component;
