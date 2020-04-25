import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./encounter.module.scss";

// import Encounter from '../../game-mechanics/encounter';
import { spawnFoe } from '../../ducks/foe';
import { drawHand, shuffleDeck } from '../../ducks/player';

import Hand from '../hand'
import DrawZone from '../draw-zone'
import DiscardZone from '../discard-zone'
import PlayerHealth from '../player-health'
import FoeZone from '../foe-zone'

const EncounterScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spawnFoe());
        dispatch(shuffleDeck());
        dispatch(drawHand());
    }, []);

    return (
    <div className={styles.game}>
            <button onClick={ () => dispatch( shuffleDeck() ) }> shuffle </button>
            <PlayerHealth />
            <FoeZone />
        <div className={styles.playerZone}> 
            <DrawZone />
            <Hand />
            <DiscardZone />
        </div>
    </div>
    );
    
}


export default EncounterScreen;

