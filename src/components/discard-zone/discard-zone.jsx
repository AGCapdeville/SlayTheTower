import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './discard-zone.module.scss'

// import Encounter from '../../game-mechanics/encounter';
import { usePlayer, drawHand, shuffleDeck } from '../../ducks/player';
import { findAllInRenderedTree } from 'react-dom/test-utils';


const DiscardZone = () =>{
    const player = usePlayer();
    return(

        <div className = {styles.discardZone}>
            <div className = {styles.void}> 
                {player.void.length}
            </div>
            <div className = {styles.discard}>
                {player.discard.length}
            </div>
        </div>
    );
}


export default DiscardZone;
