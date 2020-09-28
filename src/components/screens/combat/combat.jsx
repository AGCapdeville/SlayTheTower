import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./combat.module.scss";

import { usePlayer, updatePlayer } from '../../../ducks/player';

import CombatZone from '../../combat-components/combat-zone';

import { updateScreen } from '../../../ducks/screen';

import Hand from '../../combat-components/hand';
import DrawZone from '../../combat-components/draw-zone';
import DiscardZone from '../../combat-components/discard-zone';

import { useFoe } from '../../../ducks/foe';

import { updateClimbState } from '../../../ducks/climbState';

import PartyStatus from '../../combat-components/player-status';


const CombatScreen = () => {
    const { gold: loot } = useFoe();
    const { health: foeHealth } = useFoe();
    const player = usePlayer();

    const dispatch = useDispatch();
    
    useEffect(() => {
        // This block of code only executes when foeHealth changes
        if (foeHealth <= 0) {
            dispatch( updateClimbState({ loot: loot, playerGold: player.gold }) )
            dispatch( updatePlayer({ energy: 3, defense:0 }) )
            dispatch( updateScreen('Resolution') ) 
        }
    }, [foeHealth]);

    useEffect(() => {
        if (player.health <= 0) {
            dispatch( updateClimbState({defeat:true}) )
            dispatch( updatePlayer({ energy: 3, defense:0 }) )
            dispatch( updateScreen('Resolution') ) 
        }
    }, [player.health]);

    return (
    <div className={styles.game}>

        <PartyStatus />

        <div style={{zIndex: -1}}>
            <CombatZone />
        </div>

        {/* make the combat messages toggle-able and keep message record... TODO! */}
        <div id='combatZone' className={styles.combatZoneOverlay}>
            <div id='combatMsgs' className={styles.combatMsgs}> COMBAT MSGS </div>
        </div>

        <div id='playerZone'></div>
        <Hand />
        <div className={styles.playerZone}> 
            <DrawZone />
            <DiscardZone />
        </div>
            
    </div>
    );
    
}


export default CombatScreen;

