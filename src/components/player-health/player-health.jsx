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

function updateArmorBar(armor){
    var bar = document.getElementById("armorBar")
    bar.style.backgroundColor = 'lightblue'
    bar.style.position = 'absolute'
    bar.style.opacity = '.75'

    if (armor == 0){
        bar.style.height = "4vh"
        bar.style.width = "0vw" // 80 is max armor... should reach that tho...
    }

    if (armor > 0 ){
        const newArmor = (armor/80) // 80vw
        bar.style.width = armor + "vw"        
    }
}

const PlayerHealth = () =>{

    const player = usePlayer();

    useEffect( () => {
        updateHealthBar(player.health, player.maxHealth)
    }, [player.health])

    useEffect( () => {
        updateArmorBar(player.armor)
    }, [player.armor])
    
    return(
        <div className = {styles.playerHealthBorder}> 
            <div className = {styles.playerHealthIndicator}>
                {player.health} / {player.maxHealth}
            </div>
            <div id="playerHealthBar"> </div> 
            <div id="armorBar"> </div>
        </div>
    );
}


export default PlayerHealth;
