import React from 'react';
import styles from "./hero-zone.module.scss";

import Hero from "../../../hero";


const HeroZone = () => {

    return(
        <div className={styles.heroColumn}>

            <Hero 
                heroType={'mage'} 
                status={'normal'}
            />

            <Hero 
                heroType={'sword'} 
                status={'normal'}
            />

            <Hero 
                heroType={'shield'} 
                status={'normal'}
            />

        </div>
    );
}


export default HeroZone;
