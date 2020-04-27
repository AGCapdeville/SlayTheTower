import React from 'react';
import styles from './player-health.module.scss'

// import Encounter from '../../game-mechanics/encounter';
import { usePlayer } from '../../ducks/player';
import { useEffect } from 'react';


function updateHealthBar(health, maxHealth){
    var bar = document.getElementById("playerHealthBar")
    bar.style.backgroundColor = 'darkgreen'

    if (health == maxHealth){
        bar.style.height = "4vh"
        bar.style.width = "80vw"
    }

    if (health < maxHealth){
        const dmg = ((health/maxHealth)*80) // 80vw
        // const newBar = Math.ceil(health - dmg)
        bar.style.width = dmg + "vw"        
    }
}

const PlayerHealth = () =>{

    const player = usePlayer();

    useEffect( () => {
        updateHealthBar(player.health, player.maxHealth)
    }, [player.health])
    
    return(
        <div className = {styles.playerHealthBorder}> 
            <div className = {styles.playerHealthIndicator}>
                {player.health} / {player.maxHealth}
            </div>
            <div id="playerHealthBar"> </div> 
        </div>
    );
}


export default PlayerHealth;
