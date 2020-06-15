import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./encounter.module.scss";

import { spawnFoe } from '../../../ducks/foe';
import { drawHand, shuffleDeck, useCard, usePlayer } from '../../../ducks/player';

import { setScreen } from '../../../ducks/screen';

import Hand from '../../hand'
import DrawZone from '../../draw-zone'
import DiscardZone from '../../discard-zone'
import PlayerHealth from '../../player-health'
import FoeZone from '../../foe-zone'
import TurnBttn from '../../turn-bttn'

import { useFoe } from '../../../ducks/foe'
// import { usePlayer } from '../../../ducks/player'

const EncounterScreen = () => {
    const { health: foeHealth } = useFoe();
    const player = usePlayer();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spawnFoe());
        dispatch(shuffleDeck());
        dispatch(drawHand());
    }, []);

    useEffect(() => {
        // This block of code only executes when foeHealth changes
        console.log("encounter foe hp:", foeHealth)
        if (foeHealth <= 0) {
            alert("Victory")
            // update end screen with win
            dispatch(setScreen('End'))
        }
    }, [foeHealth]);

    useEffect(() => {
        if (player.health <= 0) {
            alert("Defeat")
            // update end screen with loss
            dispatch(setScreen('End'))
        }
    }, [player.health]);

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

