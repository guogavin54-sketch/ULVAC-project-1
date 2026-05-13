import React, { useEffect, useRef } from 'react';
import styles from './BusinessSection.module.css';

// SVG Assets imports (mocked via Jest in tests, would be actual paths in bundler)
import ChevronRight from '../../../assets/images/chevron_right_blue.svg';
import Card1 from '../../../assets/images/card1_semiconductor.svg';
import Card2 from '../../../assets/images/card2_industrial.svg';
import Card3 from '../../../assets/images/card3_display.svg';
import Card4 from '../../../assets/images/card4_components.svg';
import Card5 from '../../../assets/images/card5_materials.svg';
import Card6 from '../../../assets/images/card6_vacuum.svg';

const cardsData = [
  {
    id: 1,
    title: 'Semiconductor and Electronic Device Production Equipment',
    desc: 'Super-miniaturization technologies delivering products that support societal progress through high-performance devices',
    img: Card1,
  },
  {
    id: 2,
    title: 'Industrial Equipment',
    desc: 'Solutions across wide-ranging industries, including automobile, pharmaceutical, and food',
    img: Card2,
  },
  {
    id: 3,
    title: 'Display and Energy-Related Production Equipment',
    desc: 'Coating and processing solutions for various materials including glass substrates, plastics, and films',
    img: Card3,
  },
  {
    id: 4,
    title: 'Components',
    desc: 'Vacuum pumps, measurement and analysis equipment, power generators, and vacuum valves',
    img: Card4,
  },
  {
    id: 5,
    title: 'Materials',
    desc: 'Electric materials, such as sputtering targets, and precision-processed metals for diverse applications',
    img: Card5,
  },
  {
    id: 6,
    title: 'Vacuum Application Business (Surface analysis • Coating)',
    desc: 'Surface analysis and coating — technology derived from vacuum-based production equipment for diverse industries',
    img: Card6,
  },
];

const BusinessCard = ({ title, desc, img }) => {
  return (
    <div className={styles.card} data-testid="business-card">
      <img src={img} className={styles.maskGroup} alt={title} />
      <div className={styles.text}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardDesc}>{desc}</p>
      </div>
    </div>
  );
};

const BusinessSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.contents} ref={sectionRef} data-testid="business-section">
      <div className={styles.containerTitle}>
        <p className={styles.uLvacOperatesBusines}>
          ULVAC Operates Businesses in Six Areas
        </p>
        <div className={styles.button}>
          <span className={styles.superMiniaturization}>See Business Overview</span>
          <img src={ChevronRight} className={styles.chevronRight} alt="Arrow Right" />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.containerCard}>
          {cardsData.slice(0, 3).map((card) => (
            <BusinessCard key={card.id} {...card} />
          ))}
        </div>
        <div className={styles.containerCard}>
          {cardsData.slice(3, 6).map((card) => (
            <BusinessCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessSection;