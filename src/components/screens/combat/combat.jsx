import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./combat.module.scss";

import { usePlayer, updatePlayer } from '../../../ducks/player';

import CombatZone from '../../combat-components/combat-zone';

import { updateScreen } from '../../../ducks/screen';

import Hand from '../../combat-components/hand';
import DrawZone from '../../combat-components/draw-zone';
import DiscardZone from '../../combat-components/discard-zone';
import CombatLog from '../../combat-components/combat-log';

import { useFoe } from '../../../ducks/foe';
import { updateCombat } from '../../../ducks/combat';

import { updateGameState } from '../../../ducks/game_state';

import PartyStatus from '../../combat-components/player-status';


const CombatScreen = () => {
    const { gold: loot } = useFoe();
    const { health: foeHealth } = useFoe();
    const player = usePlayer();

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch( updatePlayer({ energy: 3, defense:0 }) );
    }, [])
    
    useEffect(() => {
        // This block of code only executes when foeHealth changes
        if (foeHealth <= 0) {
            dispatch( updateGameState({loot: loot, playerGold: player.gold }) )
            
            dispatch( updateCombat({
                combatLog : 
                    [{
                        origin: 'player',
                        description: 'Start of combat'
                    }]
            }))

            setTimeout( function(){
                dispatch(updateGameState({screen:'Resolution'}));
                dispatch( updateScreen('Resolution') ) 
            }, 1500);
        }
    }, [foeHealth]);

    useEffect(() => {
        if (player.health <= 0) {
            dispatch( updateGameState({defeat:true}) )
            dispatch( updateCombat({
                combatLog : 
                    [{
                        origin: 'player',
                        description: 'Start of combat'
                    }]
            }))

            setTimeout( function(){
                dispatch(updateGameState({screen:'Resolution'}));
                dispatch( updateScreen('Resolution') ) 
            }, 1500);       
        }
    }, [player.health]);

    return (
    <div className={styles.game}>

        <PartyStatus />

        <CombatZone />

        <CombatLog />

        {/* this is the overlay for the players hand... */}
        <div id='playerOverlay'></div>
        
        <Hand />
        
        <div className={styles.playerZone}> 
            <DrawZone />
            <DiscardZone />
        </div>
            
    </div>
    );
    
}


export default CombatScreen;

