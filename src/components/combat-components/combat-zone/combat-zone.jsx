import React from 'react';
import styles from './combat-zone.module.scss'

import FoeZone from './foe-zone';
import HeroZone from './hero-zone';


const CombatZone = () => {

    return (
        <div className = {styles.combatZone}>

            <div className = {styles.heroContainer}>
                <HeroZone />
            </div>

            <div className = {styles.foeContainer}>
                <FoeZone />
            </div>
            
        </div>
    );
}


export default CombatZone;
