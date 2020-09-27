import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./combat.module.scss";

import { spawnFoe } from '../../../ducks/foe';
import { usePlayer, updatePlayer } from '../../../ducks/player';

import { updateScreen } from '../../../ducks/screen';

import Hand from '../../combat-components/hand';
import DrawZone from '../../combat-components/draw-zone';
import DiscardZone from '../../combat-components/discard-zone';
import PlayerHealth from '../../combat-components/player-health';
import FoeZone from '../../combat-components/foe-zone';
import TurnBttn from '../../combat-components/turn-bttn';

import { useFoe } from '../../../ducks/foe';

import { updateClimbState } from '../../../ducks/climbState';
import { updateMap } from '../../../ducks/map';


const CombatScreen = () => {
    const { gold: loot } = useFoe();
    const { health: foeHealth } = useFoe();
    const player = usePlayer();

    const dispatch = useDispatch();
    
    useEffect(() => {
        // This block of code only executes when foeHealth changes
        if (foeHealth <= 0) {
            dispatch( updateClimbState({loot: loot, playerGold: player.gold}) )
            dispatch( updatePlayer({ energy: 3, armor:0 }) )
            dispatch( updateScreen('Resolution') ) 
        }
    }, [foeHealth]);

    useEffect(() => {
        if (player.health <= 0) {
            dispatch( updateClimbState({defeat:true}) )
            dispatch( updatePlayer({ energy: 3, armor:0}) )
            dispatch( updateScreen('Resolution') ) 
        }
    }, [player.health]);

    return (
    <div className={styles.game}>
        {/* <button onClick={ () => dispatch( shuffleDeck() ) }> shuffle </button> */}
        <PlayerHealth />
        <FoeZone />
        <div id='combatZone' className={styles.combatZoneOverlay}>
            <div id='combatMsgs' className={styles.combatMsgs}> COMBAT MSGS </div>
        </div>

        <div className={styles.playerZone}> 
            <div id='playerZone'></div>
            <DrawZone />
            <Hand />
            <DiscardZone />
            <TurnBttn />
        </div>
            
    </div>
    );
    
}


export default CombatScreen;

