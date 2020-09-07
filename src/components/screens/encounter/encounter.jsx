import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./encounter.module.scss";

import { spawnFoe } from '../../../ducks/foe';
import { usePlayer, updatePlayer } from '../../../ducks/player';

import { updateScreen } from '../../../ducks/screen';

import Hand from '../../hand'
import DrawZone from '../../draw-zone'
import DiscardZone from '../../discard-zone'
import PlayerHealth from '../../player-health'
import FoeZone from '../../foe-zone'
import TurnBttn from '../../turn-bttn'

import { useFoe } from '../../../ducks/foe'

import { updateClimbState } from '../../../ducks/climbState';
import { updateMap } from '../../../ducks/map';


const EncounterScreen = () => {
    const { health: foeHealth } = useFoe();
    const player = usePlayer();

    const dispatch = useDispatch();
    

    useEffect(() => {
        // This block of code only executes when foeHealth changes
        console.log("encounter foe hp:", foeHealth)
        if (foeHealth <= 0) {
            dispatch(spawnFoe());
            dispatch( updateScreen('Map') )
            dispatch( updatePlayer({ energy: 3, armor:0 }) )
            // dispatch( updateScreen('End') ) < - - - - - - When resolve: victory screen is working...
        }
    }, [foeHealth]);

    useEffect(() => {
        if (player.health <= 0) {
            dispatch(spawnFoe());
            dispatch( updateClimbState({defeat:true}) )
            dispatch( updatePlayer({ energy: 3, armor:0 }) )
            // dispatch( updateScreen('End') ) < - - - - - - When resolve: death screen is working...
            dispatch( updateScreen('Map') )
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

