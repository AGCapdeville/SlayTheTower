import React from 'react';
import styles from './draw-zone.module.scss'

import { usePlayer } from '../../../ducks/player';
import { useDispatch } from 'react-redux'


const DrawZone = () =>{
    const player = usePlayer();
    const dispatch = useDispatch()

    return(
        <div className={styles.drawZone}>
            
            <div className={styles.energy}>
                ENERGY: {player.energy}
            </div>
            
            <div className={styles.deck}>
                DECK: {player.deck.length}
            
            </div>
        </div>
    );
}


export default DrawZone;
