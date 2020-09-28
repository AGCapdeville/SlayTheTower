import React from 'react';
import styles from "./hero-zone.module.scss";


const HeroZone = () => {

    return(
        <div className={styles.heroColumn}>

            <div className={styles.heroContainer}> Utility hero</div>
            <div className={styles.heroContainer}> Attack hero</div>
            <div className={styles.heroContainer}> Defense hero</div>

        </div>
    );
}


export default HeroZone;
