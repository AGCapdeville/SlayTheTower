import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./bonfire.module.scss";

import { updateGameState, useGameState } from '../../../ducks/game_state'
import { updatePlayer, usePlayer, removeCurses } from '../../../ducks/player';
import { updateScreen } from '../../../ducks/screen';
import Hero from "../../hero";

import PartyStatus from '../../combat-components/player-status';

import menuSound from '../../../sound_clips/menu_select.mp3'

// import { useShop } from '../../../ducks/shop';

function handleOption(option, dispatch, player){
    let restB = document.getElementById('restButton');
    let resurectB = document.getElementById('resurectButton');
    let trainB = document.getElementById('trainButton');
    
    restB.disabled = true;
    restB.style.zIndex = -1;
    resurectB.disabled = true;
    resurectB.style.zIndex = -1;
    trainB.disabled = true;
    trainB.style.zIndex = -1;

    switch (option) {
        case 'cleanse':
            dispatch(removeCurses());
            dispatch(updateGameState({screen:'Map'}));
            dispatch(updateScreen('Map'))
            break;

        case 'rest':
            let twentyFivePercent = player.health * 0.25
            
            if( Math.floor(player.health + twentyFivePercent) > player.maxHealth){
                dispatch(updatePlayer({health: player.maxHealth}));
            }else{
                dispatch(updatePlayer({health: Math.floor(player.health + twentyFivePercent) }));
            }

            dispatch(updateGameState({screen:'Map'}));
            setTimeout( function(){
                dispatch(updateScreen('Map'))
            }, 1000);

            break;
        case 'resurrect':
            dispatch(updatePlayer( {utilityHeroStatus: 'standing', defenseHeroStatus: 'standing', offenseHeroStatus: 'standing'}))
            dispatch(updateGameState({screen:'Map'}));
            dispatch(updateScreen('Map'))
            break;
    }
}

function playMenuSound(){
    let sounds = document.createElement('audio');
    sounds.src = menuSound;
    sounds.volume = 0.1;
    sounds.play();
}

const BonfireScreen = () => {

    const dispatch = useDispatch();
    const player = usePlayer();

    return (
        <div className={styles.screenContainer}>
            <div className={styles.screen}>
                <PartyStatus />


                <h1>🔥 Bonfire 🔥 </h1>


                <div className={styles.heroLineUp}>
                    <Hero 
                        heroType={'mage'} 
                        status={'normal'}
                    />

                    <Hero 
                        heroType={'sword'} 
                        status={'normal'}
                    />

                    <Hero 
                        heroType={'shield'} 
                        status={'normal'}
                    />
                </div>


                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>

                        <button id="trainButton" onMouseEnter={()=>playMenuSound()} className={styles.bonfireOption} onClick={() => handleOption('cleanse', dispatch, player)} >
                            🕯️ Cleanse
                            <div className={styles.subtext}>Remove all curses from deck...</div>
                        </button>

                        <button id="restButton" onMouseEnter={()=>playMenuSound()} className={styles.bonfireOption} onClick={() => handleOption('rest', dispatch, player)}>
                            🔥 Rest
                            <div className={styles.subtext}>Heal 25% of parties health points...</div>
                        </button>

                        <button id="resurectButton"  onMouseEnter={()=>playMenuSound()} className={styles.bonfireOptionOff} >
                            ✨ Resurrect  
                            <div className={styles.subtext}>Resurect all dead heros... [ currently not in the game ]</div>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default BonfireScreen;
