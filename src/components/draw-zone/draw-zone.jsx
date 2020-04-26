import React from 'react';
import styles from './draw-zone.module.scss'

// import Encounter from '../../game-mechanics/encounter';
import { usePlayer, playCard, drawCard } from '../../ducks/player';
import { useDispatch } from 'react-redux'


const DrawZone = () =>{
    const player = usePlayer();
    const dispatch = useDispatch()

    return(
        <div className={styles.drawZone}>
            <div className={styles.energy}>
                {player.energy}
            </div>
            <button onClick={ () => dispatch( drawCard() ) }> DRAW </button>
            <div className={styles.deck}>
                {player.deck.length}
            </div>
        </div>
    );
}


export default DrawZone;
