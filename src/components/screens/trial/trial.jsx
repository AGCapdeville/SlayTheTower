import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./trial.module.scss";

import { updateGameState } from '../../../ducks/game_state'
import { usePlayer } from '../../../ducks/player';
import { updateScreen } from '../../../ducks/screen';

const updateGame = (dispatch, choice) =>{
    dispatch(updateGameState({screen:'Map'}));
    dispatch(updateScreen('Map'));
}

const TrialScreen = () => {

    const dispatch = useDispatch();
    // const game_state = useGameState();
    const player = usePlayer();


    return (
    <div className={styles.screenContainer}>
        <div className={styles.screen}>

        <div className={styles.trialTitle}>
            Trial Title
            <h4>❤️{player.health}</h4>
        </div>

        <div className={styles.artContainer}>
            <h4> trial art here </h4>
        </div>

        <div className={styles.trialInfoContainer}>
            <div className={styles.trialDescription}>
                <h5> trial description </h5>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...  
            </div>

            <div className={styles.trialOptionsContainer}>
                <button className={styles.trialOptions} onClick={() => updateGame(dispatch, 'attempt')}>Attempt...</button>
                <button className={styles.trialOptions} onClick={() => updateGame(dispatch, 'run')}>Run...</button>
                <button className={styles.trialOptions} onClick={() => updateGame(dispatch, 'bargin')}>Bargin...</button>
            </div>
        </div>


        </div>
    </div>
    );
}

export default TrialScreen;
