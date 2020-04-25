import React from 'react';
import styles from './draw-zone.module.scss'

// import Encounter from '../../game-mechanics/encounter';
import { usePlayer } from '../../ducks/player';


const DrawZone = () =>{
    const player = usePlayer();
    return(
        <div className={styles.drawZone}>
            <div className={styles.energy}>
                {player.energy}
            </div>
            <br/>
            <div className={styles.deck}>
                {player.deck.length}
            </div>
        </div>
    );
}


export default DrawZone;
