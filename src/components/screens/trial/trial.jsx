import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./trial.module.scss";

import { updateGameState } from '../../../ducks/game_state'
import { usePlayer, updatePlayer, addCard } from '../../../ducks/player';
import { updateScreen } from '../../../ducks/screen';
import PartyStatus from '../../combat-components/player-status';

import {trials} from '../../../game-data/trials-data';

import {afflictionCards} from '../../../game-data/affliction-card-data';


// const updateGame = (dispatch, choice) =>{
//     dispatch(updateGameState({screen:'Map'}));
//     dispatch(updateScreen('Map'));
// }

const trialOptionMade = (choice, dispatch, player) => {


    // odds: 40,
    // reward: 'wealth',
    // reward_value: 40,
    // lose: 'curse',
    // lose_value: 1

    let rw = document.getElementById('resultWindow');
    rw.style.opacity = 1;
    rw.style.zIndex = 100;

    let text = document.getElementById('result');
    let result = rollDice(0,100);

    if ( result > choice.odds){

        if (choice.reward == 'maxHealth'){
            let prev = player.maxHealth
            let newMax = player.maxHealth + choice.reward_value
            console.log('! newMax health:', newMax)
            dispatch( updatePlayer( {maxHealth: newMax}) )
            text.innerHTML = 'Success, max health of party increased. ❤️' + prev +' > >  ❤️'+ newMax
        }

        if (choice.reward == 'wealth'){
            let g = player.gold
            dispatch( updatePlayer( {gold: (player.gold + choice.reward_value)}) )
            text.innerHTML = 'Success, the party aquired great fortune. G' + g +' + '+ choice.reward_value
        }

    }else{
        
        if (choice.lose == 'curse'){
            for (let i = 0; i < choice.lose_value; i++) {
                dispatch(addCard( afflictionCards.find( affliction => affliction.name === 'Curse') ) )              
            }
            text.innerHTML = 'The party accidently grabbed a cursed relic.' + choice.lose_value + ' curses have been added to the parties deck.'
        }
    }
    



}

const continueButton = (dispatch) => {
    dispatch(updateGameState({screen:'Map'}));
    dispatch(updateScreen('Map'));
}

function rollDice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

const TrialScreen = () => {

    const dispatch = useDispatch();
    const player = usePlayer();

    const trial = trials[rollDice(0,trials.length)];

    return (
    <div className={styles.screenContainer}>

        <div id='resultWindow' className={styles.resultWindow}>
            <div className={styles.reultText}>
                <div className={styles.trialDescription}>
                    <h5 id="result"/>
                </div>
                <button className={styles.trialOptions} onClick={()=>continueButton(dispatch)}>continue</button>
            </div>
        </div>

        <div className={styles.screen}>
        <PartyStatus />


        <div style={{display:"flex", flexDirection:"row"}}>

            {/* <div className={styles.artContainer}>
                <h4> trial art here </h4>
            </div> */}

            <div className={styles.trialInfoContainer}>
                <div className={styles.trialDescription}>
                    <h5> {trial.description} </h5>
                </div>

                <div className={styles.trialOptionsContainer}>
                    {
                        trial.options.map( option => 
                            <button className={styles.trialOptions} onClick={() => trialOptionMade(option, dispatch, player) }>
                                {option.description}
                            </button>
                        )
                    }
                    <button className={styles.trialOptions} onClick={() => continueButton(dispatch) }>
                        Leave
                    </button>
                </div>

            </div>

        </div>

        </div>
    </div>
    );
}

export default TrialScreen;
