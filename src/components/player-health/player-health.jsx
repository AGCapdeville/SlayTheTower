import React from 'react';
import styles from './player-health.module.scss'

// import Encounter from '../../game-mechanics/encounter';
import { usePlayer } from '../../ducks/player';


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
