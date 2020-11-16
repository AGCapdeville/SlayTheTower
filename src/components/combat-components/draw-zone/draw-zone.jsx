import React from 'react';
import styles from './draw-zone.module.scss'
import { usePlayer } from '../../../ducks/player';


const DrawZone = () =>{
    const player = usePlayer();

    return(
        <div className={styles.drawZone}>
            
            <div id='heroEnergyText' className={styles.energy}>
                <span style={{fontSize: '18px'}}>⚡</span> ENERGY: {player.energy}
            </div>
            
            <div className={styles.deck}>
                DECK: {player.deck.length}
            
            </div>
        </div>
    );
}


export default DrawZone;
