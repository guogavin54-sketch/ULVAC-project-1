import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.privacyPolicyTermsOf}>
        <div className={styles.frame18}>
          <img
            src="../image/mp3quxx8-izeqmh7.png"
            className={styles.uLvaclogoWhite1}
          />
          <div className={styles.container}>
            <div className={styles.location}>
              <img
                src="../image/mp3quxx6-gfqbb6v.svg"
                className={styles.locationOn}
              />
              <p className={styles.uLvacInc2500Hagisono}>
                ULVAC, Inc.
                <br />
                2500 Hagisono, Chigasaki, Kanagawa 253-8543, Japan
              </p>
            </div>
            <div className={styles.phone}>
              <img
                src="../image/mp3quxx6-qxfyz5g.svg"
                className={styles.locationOn}
              />
              <p className={styles.a0467892033}>0467-89-2033</p>
            </div>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.list}>
            <div className={styles.item}>
              <p className={styles.home}>SITEMAP</p>
            </div>
            <p className={styles.home2}>Home</p>
            <p className={styles.home2}>About ULVAC</p>
            <p className={styles.home2}>News</p>
            <p className={styles.home2}>Investor Relations</p>
            <p className={styles.home2}>Contact</p>
          </div>
          <div className={styles.list2}>
            <p className={styles.home3}>ULVAC Sites</p>
            <p className={styles.home2}>Corporate Site (EN)</p>
            <p className={styles.home2}>Corporate Site (JP)</p>
          </div>
        </div>
      </div>
      <div className={styles.container3}>
        <p className={styles.a2026UlvacIncAllRigh}>
          © 2026 ULVAC, Inc. All Rights Reserved.
        </p>
        <div className={styles.item2}>
          <p className={styles.home4}>Privacy Policy</p>
          <p className={styles.home4}>Terms of Use</p>
        </div>
      </div>
    </div>
  );
}

export default Component;
