import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './player-health.module.scss'

// import Encounter from '../../game-mechanics/encounter';
import { usePlayer, drawHand, shuffleDeck } from '../../ducks/player';
import { findAllInRenderedTree } from 'react-dom/test-utils';


const PlayerHealth = () =>{
    const player = usePlayer();
    return(
        <div className = {styles.playerHealthBorder}> 
            <div className = {styles.playerHealthIndicator}>
                {player.health} / {player.maxHealth}
            </div>
            <div className = {styles.playerHealthBar} /> 
        </div>
    );
}


export default PlayerHealth;
