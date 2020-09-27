import React from 'react';
import styles from './discard-zone.module.scss'

import { usePlayer, playCard, playIndexedCard } from '../../../ducks/player';
import { useDispatch } from 'react-redux'



const DiscardZone = () =>{
    const player = usePlayer();
    const dispatch = useDispatch();
    return(
        <div className = {styles.discardZone}>
            <div className={styles.void}> 
                VOID: <div/> {player.voidDeck.length}
            </div>
            <div className={styles.discard}>
                DISCARD: <div/> {player.discard.length}
                {/* <div/> */}
                {/* <button className={styles.devButton} onClick={ () => dispatch( playCard() ) }> discard/play </button> */}
            </div>
        </div>
    );
}


export default DiscardZone;
