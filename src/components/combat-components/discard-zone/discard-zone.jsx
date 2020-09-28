import React from 'react';
import styles from './discard-zone.module.scss'

import { usePlayer, playCard, playIndexedCard } from '../../../ducks/player';
import { useDispatch } from 'react-redux'

import TurnBttn from '../turn-bttn';

const DiscardZone = () =>{
    const player = usePlayer();
    const dispatch = useDispatch();
    return(
        <div className = {styles.discardZone}>
            <div className={styles.void}> 
                VOID: <div/> {player.voidDeck.length}
            </div>
            <br/>
            <div className={styles.discard}>
                DISCARD: <div/> {player.discard.length}
            </div>
            <br/>
            <TurnBttn />
        </div>
    );
}


export default DiscardZone;
