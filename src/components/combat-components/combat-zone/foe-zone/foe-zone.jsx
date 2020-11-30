import React from 'react';
import { useMonster } from '../../../../ducks/monster'
import styles from "./foe-zone.module.scss";
import { useEffect } from 'react';

import Slime from '../../../monsters/slime';
import Enforcer from '../../../monsters/enforcer';
import Stone from '../../../monsters/stone';

import Nul from '../../../monsters/nul';
import Fire from '../../../monsters/fire';

import Eye from '../../../monsters/eye';

const monsterList = {
    Slime,
    Enforcer,
    Nul,
    Fire,
    Stone,
    Eye
}

function updateFoeHealthBar(foeHealth, foeMax){
    var x = document.getElementById("foeHealthBar")
    x.style.backgroundColor = "red"

    if (foeHealth === foeMax){
        x.style.height = "2vh"
        x.style.width = "20vw"
    }

    if (foeHealth < foeMax){
        const percentOfHealth = ( (foeHealth/foeMax)*100 )
        const newBar = ((percentOfHealth/100)*20)
        x.style.width = newBar + "vw"
    }
}


function getTelegraph(monster){
    
    const effect = monster.telegraphing.effect[0];
    const power = monster.telegraphing.power[0];

    if (effect === "damage"){
        return ('🔪 '+power);
    }else if (effect === "defense"){
        return ('🛡️ '+power);
    }else if (effect === "fatigue" || effect === "bleed" || effect === "stun"){
        return '💢';
    }else {
        return '💭';
    }

}

const FoeZone = () => {

    const { health: foeHealth } = useMonster();
    const { total: foeMax } = useMonster();
    const monster = useMonster();
    const Monster = monsterList[monster.name];
    const telegraph = getTelegraph(monster)

    useEffect(() => {
        updateFoeHealthBar(foeHealth, foeMax)
    }, [foeHealth]);
    
    return(
        <div className={styles.foeZone}>

            <div className = {styles.foe}>

                <div className={styles.telegraph}> {telegraph} </div>
                <div className={styles.foeTitle}> {monster.name} </div>
                
                <div id='monsterOuterContainer' className={styles.monsterContainer}>
                    {
                        monster.aligment.includes('stun') ?
                        <div className={styles.stunCounter}> ⚡ {monster.aligmentDuration[monster.aligment.indexOf("stun")]} </div> : <div className={styles.stunCounter}> </div>
                    }
                    <Monster/>
                </div>

                <div className={styles.healthBarContainer}>

                    <div className = {styles.defenseEmoji}>🛡 
                        <div className = {styles.defense}> 
                            {monster.defense} 
                        </div>
                    </div>

                    <div className={styles.healthEmoji}>❤️</div>
                    <div className = {styles.foeHealthBorder}>
                        <div className = {styles.foeHealthIndicator}> 
                            {monster.health} / {monster.total} 
                        </div>
                        <div id="foeHealthBar"> </div>
                    </div>
                </div>


            </div>  
        </div>        
    );
}


export default FoeZone;
