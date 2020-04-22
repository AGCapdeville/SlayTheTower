import React from 'react'
import styles from "./encounter.module.scss"

import Encounter from '../../game-mechanics/encounter'
import {useFoe} from '../../ducks/foe'

// var leftFoeHeight = 20;
// var leftFoeWidth = 10;

// var middleFoeHeight = 20;
// var middleFoeWidth = 10;

// var rightFoeHeight = 20;
// var rightFoeWidth = 10;

// pull from monster list, if small/medium/large monster, render apropriatly 


// all screen elements need to be put into individual components?

const EncounterScreen = () => {
    
    const encounter = new Encounter();
    encounter.spawnCreep()

    const foe = useFoe()
    // console.log(foe.name)

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
                        <img src={foe.img} alt="foe img"/>
                    </div>
                    <div className = {styles.foeHealthBorder}>
                        <div className = {styles.foeHealthBar}>
                        {/* 12/12 */}
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
                    CARDS HERE
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

