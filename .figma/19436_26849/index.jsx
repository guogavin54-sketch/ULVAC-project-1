import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section}>
      <p className={styles.moreInformation}>More Information</p>
      <div className={styles.containerLink}>
        <div className={styles.link2}>
          <div className={styles.buttonCard}>
            <p className={styles.managementStructure}>Management Structure</p>
            <div className={styles.link}>
              <p className={styles.viewDetails}>View Details</p>
              <img
                src="../image/mpp62rjs-vyjl2me.svg"
                className={styles.chevronRight}
              />
            </div>
          </div>
          <div className={styles.buttonCard}>
            <p className={styles.managementStructure}>Organization</p>
            <div className={styles.link}>
              <p className={styles.viewDetails}>View Details</p>
              <img
                src="../image/mpp62rjs-vyjl2me.svg"
                className={styles.chevronRight}
              />
            </div>
          </div>
        </div>
        <div className={styles.link2}>
          <div className={styles.buttonCard}>
            <p className={styles.managementStructure}>Sustainability</p>
            <div className={styles.link}>
              <p className={styles.viewDetails}>View Details</p>
              <img
                src="../image/mpp62rjs-vyjl2me.svg"
                className={styles.chevronRight}
              />
            </div>
          </div>
          <div className={styles.buttonCard}>
            <p className={styles.managementStructure}>Company Profile Download</p>
            <div className={styles.link}>
              <p className={styles.viewDetails}>View Details</p>
              <img
                src="../image/mpp62rjs-vyjl2me.svg"
                className={styles.chevronRight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
