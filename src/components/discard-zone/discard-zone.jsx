import React from 'react';
import styles from './discard-zone.module.scss'

import { usePlayer, playCard, playIndexedCard } from '../../ducks/player';
import { useDispatch } from 'react-redux'



const DiscardZone = () =>{
    const player = usePlayer();
    const dispatch = useDispatch();
    return(

        <div className = {styles.discardZone}>
            
            <div className = {styles.void}> 
                {player.void.length}
            </div>
            
            <button onClick={ () => dispatch( playCard() ) }> discard/play </button>
            
            <div className = {styles.discard}>
                {player.discard.length}
            </div>
        </div>
    );
}


export default DiscardZone;
