import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./encounter.module.scss";

// import Encounter from '../../game-mechanics/encounter';
import { spawnFoe } from '../../ducks/foe';
import { drawHand, shuffleDeck, useCard } from '../../ducks/player';

import Hand from '../hand'
import DrawZone from '../draw-zone'
import DiscardZone from '../discard-zone'
import PlayerHealth from '../player-health'
import FoeZone from '../foe-zone'
import TurnBttn from '../turn-bttn'


import { useFoe } from '../../ducks/foe'

const EncounterScreen = () => {
    const { health: foeHealth } = useFoe();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spawnFoe());
        dispatch(shuffleDeck());
        dispatch(drawHand());
    }, []);

    useEffect(() => {
        // This block of code only executes when foeHealth changes
        console.log("encounter foe hp:", foeHealth)
    }, [foeHealth])


    return (
    <div className={styles.game}>
            {/* <button onClick={ () => dispatch( shuffleDeck() ) }> shuffle </button> */}
            <PlayerHealth />
            <FoeZone />
            <div id='combatZone' className={styles.combatZoneOverlay}>
                <div id='combatMsgs' className={styles.combatMsgs}> COMBAT MSGS </div>
                <TurnBttn />
            </div>

            
        <div className={styles.playerZone}> 
            <div id='playerZone'> </div>
            <DrawZone />
            <Hand />
            <DiscardZone />
        </div>
    </div>
    );
    
}


export default EncounterScreen;

