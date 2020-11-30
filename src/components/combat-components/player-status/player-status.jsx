import React from 'react';
import styles from './player-status.module.scss'

import { updatePlayer, usePlayer } from '../../../ducks/player';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';



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

    const dispatch = useDispatch();

    useEffect(() => {
        updateHeroHealthBar(heroHealth, heroMaxHealth)
    }, [heroHealth]);

    useEffect(() => {
        let count = 0;
        for(var i = 0; i < player.deck.length; ++i){
            if(player.deck[i].type == 'curse')
                count++;
        }

        for (let i = 0; i < player.discard.length; i++) {
            if(player.discard[i].type == 'curse')
                count++;            
        }

        for (let i = 0; i < player.hand.length; i++) {
            if(player.hand[i].type == 'curse')
                count++;            
        }

        dispatch( updatePlayer( { curseCount: count } ) )
    }, [player.deck])
    
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

            {
                ( player.curseCount > 0 ) ? <div className={styles.curse}> Curses : {player.curseCount}</div> : <div></div>
            }

            
        </div>
    );
}


export default PlayerStatus;
