import React from 'react';
import styles from './combat-zone.module.scss'

import FoeZone from './foe-zone';
import HeroZone from './hero-zone';


const CombatZone = () => {

    return (
        <div className = {styles.combatZone}>
            <div className = {styles.heroVSMonster}>
                <HeroZone />
                <FoeZone />
            </div>
        </div>
    );
}


export default CombatZone;
