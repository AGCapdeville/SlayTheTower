import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./encounter.module.scss";

// import Encounter from '../../game-mechanics/encounter';
import { useFoe, spawnFoe } from '../../ducks/foe';
import { usePlayer, drawHand, shuffleDeck } from '../../ducks/player';
import { setupEncounter } from '../../ducks/encounter'

import Hand from '../hand'
import DrawZone from '../draw-zone'
import DiscardZone from '../discard-zone'
import PlayerHealth from '../player-health'
import FoeZone from '../foe-zone'

const EncounterScreen = () => {

    const foe = useFoe();
    const player = usePlayer();
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(spawnFoe());
        dispatch(shuffleDeck());
        dispatch(drawHand());

    }, []);

    return (
    <div className={styles.game}>
        
            <PlayerHealth />

            <FoeZone />

        {/* <div className={styles.foeZone}>
            <div className = {styles.foes}> 
                <div className = {styles.foe}>
                    <div className = {styles.foeImg}> 
                        {foe.name}
                        <img src={foe.art} alt="foe img"/>
                    </div>
                    <div className = {styles.foeHealthBorder}>
                        <div className = {styles.foeHealthBar}>
                        {foe.health} / {foe.totalHealth}
                        </div>
                    </div>
                </div>  
            </div>

        </div>         */}

        

        <div className={styles.playerZone}> 

            <DrawZone />

            <Hand />

            <DiscardZone />
            
        </div>
    </div>
    );
}


export default EncounterScreen;

