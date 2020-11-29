import React from 'react';
import styles from './player-status.module.scss'

import { usePlayer } from '../../../ducks/player';
import { useEffect } from 'react';


function updateHeroHealthBar(health, maxHealth){
    var x = document.getElementById("patyHealthBar")
    x.style.backgroundColor = "red"

    if (health === maxHealth){
        x.style.height = "2vh"
        x.style.width = "20vw"
    }else{
        const percentOfHealth = ( (health/maxHealth)*100 )
        const newBar = ((percentOfHealth/100)*20)
        x.style.width = newBar + "vw"
    }
}

const PlayerStatus = () =>{

    const player = usePlayer();
    const { health: heroHealth } = usePlayer();
    const { maxHealth: heroMaxHealth } = usePlayer();

    useEffect(() => {
        updateHeroHealthBar(heroHealth, heroMaxHealth)
    }, [heroHealth]);
    
    return(
        <div className = {styles.playerStatusContainer}>
            <div className = {styles.playerGold}>
                G: {player.gold}
            </div>
            
            <div className = {styles.playerDefense}>
                🛡 {player.defense}
            </div>

            <div className={styles.healthBarContainer}>
                <div className={styles.healthEmoji}>❤️</div>
                <div className = {styles.healthBorder}>
                    <div className = {styles.healthIndicator}> 
                        {player.health} / {player.maxHealth} 
                    </div>
                    <div id="patyHealthBar"> </div>
                </div>
            </div>
            
        </div>
    );
}


export default PlayerStatus;
