import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './draw-zone.module.scss'

// import Encounter from '../../game-mechanics/encounter';
import { usePlayer, drawHand, shuffleDeck } from '../../ducks/player';
import { findAllInRenderedTree } from 'react-dom/test-utils';


const DrawZone = () =>{
    const player = usePlayer();
    const dispatch = useDispatch();
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
