import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./trial.module.scss";

import { useClimbState } from '../../../ducks/climbState'
import { usePlayer, updatePlayer } from '../../../ducks/player';
import { updateScreen } from '../../../ducks/screen';

import Card from '../../card'
import { updateShop, setupShop, useShop } from '../../../ducks/shop';

const TrialScreen = () => {

    const dispatch = useDispatch();
    const climbState = useClimbState();
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
                <button className={styles.trialOptions} onClick={() => dispatch( updateScreen('Map') ) }>Attempt...</button>
                <button className={styles.trialOptions} onClick={() => dispatch( updateScreen('Map') ) }>Run...</button>
                <button className={styles.trialOptions} onClick={() => dispatch( updateScreen('Map') ) }>Bargin...</button>
            </div>
        </div>


        </div>
    </div>
    );
}

export default TrialScreen;
