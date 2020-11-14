import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./bonfire.module.scss";

import { updateGameState, useGameState } from '../../../ducks/game_state'
import { usePlayer } from '../../../ducks/player';
import { updateScreen } from '../../../ducks/screen';

// import { useShop } from '../../../ducks/shop';

function handleOption(option, dispatch){
    switch (option) {
        case 'train':
            // let player know what happend with animation of sorts.
            dispatch(updateGameState({screen:'Map'}));
            dispatch(updateScreen('Map'))
            break;
        case 'rest':
            dispatch(updateGameState({screen:'Map'}));
            dispatch(updateScreen('Map'))
            break;
        case 'mend':
            dispatch(updateGameState({screen:'Map'}));
            dispatch(updateScreen('Map'))
            break;
    }
}

const BonfireScreen = () => {

    const dispatch = useDispatch();
    // const gameState = useGameState();
    // const shop = useShop();
    const player = usePlayer();


    return (
    <div className={styles.screenContainer}>
        <div className={styles.screen}>

        <h1>🔥 Bonfire 🔥 </h1>

        <h4>❤️{player.health}</h4>

        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <button className={styles.bonfireOption} onClick={() => handleOption('train', dispatch)}>🗻 TRAIN </button>
                <button className={styles.bonfireOption} onClick={() => handleOption('rest', dispatch)}>🔥 REST </button>
                <button className={styles.bonfireOption} onClick={() => handleOption('mend', dispatch)}>✨ MEND </button>
            </div>
        </div>

        </div>
    </div>
    );
}

export default BonfireScreen;
