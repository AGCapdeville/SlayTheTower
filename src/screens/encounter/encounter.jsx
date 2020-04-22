import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./encounter.module.scss";

import Encounter from '../../game-mechanics/encounter';
import { useFoe, spawnFoe } from '../../ducks/foe';
import { usePlayer, drawHand, shuffleDeck } from '../../ducks/player';

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
        <div className={styles.foeZone}>
            <div className = {styles.playerHealthBorder}> 
                <div className = {styles.playerHealthBar}>
                    55/55
                </div> 
            </div>

            {/* Shield : https://i.imgur.com/OtrV2sJ.png */}

            <div className = {styles.foes}> 
                <div className = {styles.foe}>
                    <div className = {styles.foeImg}> 
                        {foe.name}
                        <img src={foe.art} alt="foe img"/>
                    </div>
                    <div className = {styles.foeHealthBorder}>
                        <div className = {styles.foeHealthBar}>
                        12/12
                        {foe.health} / {foe.totalHealth}
                        </div>
                    </div>
                </div>  
            </div>
        </div>        

        <div className={styles.playerZone}> 
            <div className = {styles.drawZone}>
                <div className = {styles.energy}> 3 </div>
                <div className = {styles.deck}> 5 </div>
            </div>

            <div className = {styles.activeZone}>
                <div className = {styles.hand}>
                    {/* {player.hand.map(card => <button { }}>{card.name}</button>)} */}
                </div>
            </div>

            <div className = {styles.discardZone}>
                <div className = {styles.void}> 0 </div>
                <div className = {styles.discard}> 0 </div>
            </div>
        </div>
    </div>
    );
}


export default EncounterScreen;

