import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./bonfire.module.scss";

import { useClimbState } from '../../../ducks/climbState'
import { usePlayer, updatePlayer } from '../../../ducks/player';
import { updateScreen } from '../../../ducks/screen';

// import cardData from '../../../game-data/card-data'

import Card from '../../card'
import { updateShop, setupShop, useShop } from '../../../ducks/shop';

function handleOption(option, dispatch){
    switch (option) {
        case 'train':
            // let player know what happend with animation of sorts.
            dispatch(updateScreen('Map'))
        case 'rest':
            dispatch(updateScreen('Map'))
        case 'mend':
            dispatch(updateScreen('Map'))
    }
}

const BonfireScreen = () => {

    const dispatch = useDispatch();
    const climbState = useClimbState();
    const shop = useShop();
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

        <div>
            <button onClick={() => dispatch( updateScreen('Map') ) }>
                RETURN TO MAP
            </button>
        </div>

        </div>
    </div>
    );
}

export default BonfireScreen;
