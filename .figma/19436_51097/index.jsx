import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section}>
      <p className={styles.researchDevelopment}>Research & Development</p>
      <div className={styles.paragraph}>
        <p className={styles.backIn1952UlvacWasSt}>
          Promotion of Creation and Co-Creation of Innovation with Vacuum Technology
          as the Core
        </p>
        <p className={styles.backIn1952UlvacWasSt2}>
          We have provided products and materials based on vacuum technology that is
          essential to all industries. With our integrated group development
          organization, we create high value-added products and technologies through
          innovative and advanced technical development to meet the requirements of
          overseas device makers for speed, and to satisfy the actual and potential
          needs of our customers.
        </p>
      </div>
      <div className={styles.container3}>
        <div className={styles.container}>
          <div className={styles.frame17}>
            <img src="../image/mpqozezy-o2bltiv.svg" className={styles.memory} />
          </div>
          <div className={styles.text}>
            <p className={styles.semiconductorFocus}>Semiconductor Focus</p>
            <p className={styles.strengtheningTechnol}>
              Strengthening technological capabilities in logic, memory, and power
              devices. Expanding Metal Hard Mask process for cutting-edge logic
              devices.
            </p>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.icon}>
            <img src="../image/mpqozezy-14n80e4.svg" className={styles.memory} />
          </div>
          <div className={styles.text}>
            <p className={styles.semiconductorFocus}>
              Institute of Advanced Technology
            </p>
            <p className={styles.strengtheningTechnol}>
              Develops higher functionality, reliability, and productivity of
              equipment. Advances next-generation manufacturing processes.
            </p>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.icon}>
            <img src="../image/mpqozezy-g8vd4i5.svg" className={styles.memory} />
          </div>
          <div className={styles.text}>
            <p className={styles.semiconductorFocus}>
              Future Technology Research Lab
            </p>
            <p className={styles.strengtheningTechnol}>
              Taking on challenges in promising next-generation technologies.
              Exploring new vacuum applications through co-creation with customers.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.banner}>
        <div className={styles.container4}>
          <div className={styles.text2}>
            <p className={styles.rDBases}>R&D bases</p>
            <p className={styles.a9}>9</p>
          </div>
          <div className={styles.text2}>
            <p className={styles.rDBases}>Patents held</p>
            <p className={styles.a9}>4,099</p>
          </div>
          <div className={styles.text2}>
            <p className={styles.rDBases}>R&D investment</p>
            <p className={styles.a9}>¥22.8B</p>
          </div>
        </div>
        <p className={styles.aAsOfEndOfJune2025}>*As of end of June 2025</p>
        <div className={styles.button}>
          <p className={styles.superMiniaturization}>Learn more about R&D</p>
          <img src="../image/mpqozezy-jzv9oxf.svg" className={styles.memory} />
        </div>
      </div>
    </div>
  );
}

export default Component;
