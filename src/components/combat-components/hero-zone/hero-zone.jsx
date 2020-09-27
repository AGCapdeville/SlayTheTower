import React from 'react';
import foe, { useFoe } from '../../../ducks/foe'
import styles from "./foe-zone.module.scss";
import { useEffect } from 'react';


const HeroZone = () => {

    return(
        <div style={{display:'flex', flexDirection:'column'}}>

            <div className={styles.heroContainer}> Utility hero</div>
            <div className={styles.heroContainer}> Attack hero</div>
            <div className={styles.heroContainer}> Defense hero</div>

        </div>
    );
}


export default HeroZone;
