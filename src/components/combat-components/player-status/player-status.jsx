import React from 'react';
import styles from './player-status.module.scss'

import { usePlayer } from '../../../ducks/player';
import { useEffect } from 'react';


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

            {/* OLD DEFENSE BAR */}
            {/* <div className = {styles.playerHealthBorder}>  */}
                {/* <div className = {styles.playerHealthIndicator}> */}
                {/* </div> */}
                {/* <div id="playerHealthBar"> </div>  */}
                {/* <div id="defenseBar"> </div> */}
            {/* </div> */}
            
        </div>
    );
}


export default PlayerStatus;
