import React from 'react';
import styles from './player-status.module.scss'

import { usePlayer } from '../../../ducks/player';

const PlayerStatus = () =>{

    const player = usePlayer();
    
    return(
        <div className = {styles.playerStatusContainer}>
            <div className = {styles.playerGold}>
                G: {player.gold}
            </div>
            
            <div className = {styles.playerDefense}>
                Defense: {player.defense}
            </div>

            <div className = {styles.playerHealth}>
                ❤️ {player.health} / {player.maxHealth}
            </div>
            
        </div>
    );
}


export default PlayerStatus;
