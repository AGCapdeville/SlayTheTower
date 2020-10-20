import React from 'react';
import styles from "./hero-zone.module.scss";


const HeroZone = () => {

    return(
        <div className={styles.heroColumn}>

            <div className={styles.heroContainer}>
                <div id={'offHero'} className={styles.offHero}>
                    🔪
                    <img id={'offHeroBody'} />
                </div>
            </div>

            <div className={styles.heroContainer}>
                <div id={'defHero'} className={styles.defHero}>
                    🛡️
                    <img id={'defHeroBody'} />
                </div>
            </div>

            <div className={styles.heroContainer}>
                <div id={'utilHero'} className={styles.utilHero}>
                    🔮
                    <img id={'utilHeroBody'} />
                </div>
            </div>

        </div>
    );
}


export default HeroZone;
