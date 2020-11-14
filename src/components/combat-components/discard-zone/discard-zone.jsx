import React from 'react';
import styles from './discard-zone.module.scss'

import { usePlayer } from '../../../ducks/player';
import { useDispatch } from 'react-redux'

import { endTurn } from '../../../ducks/combat'


const DiscardZone = () =>{
    const player = usePlayer();
    const dispatch = useDispatch();
    
    const onBttnClick = () =>  dispatch(endTurn());

    return(
        <div className = {styles.discardZone}>

            <div className={styles.void}> 
                VOID: {player.voidDeck.length}
            </div>

            <div className={styles.discard}>
                DISCARD: {player.discard.length}
            </div>

            <button id="turnBttn" onClick={onBttnClick} className = {styles.devButton}>
                [ END TURN ]
            </button>
        
        </div>
    );
}


export default DiscardZone;
