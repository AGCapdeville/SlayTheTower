import React from 'react';
import { useMonster } from '../../../../ducks/monster'
import styles from "./foe-zone.module.scss";
import { useEffect } from 'react';

import Slime from '../../../monsters/slime';
import Fire from '../../../monsters/fire';
const monsterList = {
    Slime,
    Fire
}

function updateFoeHealthBar(foeHealth, foeMax){
    var x = document.getElementById("foeHealthBar")
    x.style.backgroundColor = "red"

    if (foeHealth === foeMax){
        x.style.height = "2vh"
        x.style.width = "20vw"
    }

    if (foeHealth < foeMax){
        const dmg = ((foeHealth/foeMax)*20)
        const newBar = Math.ceil(foeHealth - dmg)
        x.style.width = newBar + "vw"        
    }
}

function updateFoeDefBar(defense){
    var x = document.getElementById("foeDefenseBar")
    x.style.backgroundColor = "lightblue"
    x.style.opacity = ".75"
    x.style.position = "absolute"

    if (defense === 0){
        x.style.height = "2vh"
        x.style.width = "0vw"
    }

    if (defense > 0){
        // const dmg = ((foeHealth/foeMax)*20)
        const newDefense = ((defense/100)*20)
        x.style.width = newDefense + "vw"        
    }
}

function getTelegraph(monster){
    
    console.log(monster)

    const effect = monster.telegraphing.effect[0];
    console.log("effect:",effect)
    const power = monster.telegraphing.power[0];
    console.log("power:",power)

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
    const { defense: foeDefense } = useMonster();
    const monster = useMonster();
    const Monster = monsterList[monster.name];
    const telegraph = getTelegraph(monster)


    useEffect(() => {
        updateFoeHealthBar(foeHealth, foeMax)
    }, [foeHealth]);

    useEffect(() => {
        updateFoeDefBar(foeDefense)
    }, [foeDefense])
    
    return(
        <div className={styles.foeZone}>

            <div className = {styles.foe}>

                <div className={styles.telegraph}> {telegraph} </div>
                <div className={styles.foeTitle}> {monster.name} </div>
                
                <div className={styles.monsterContainer}>
                    <Monster/>
                </div>

                <div className = {styles.foeHealthBorder}> 
                    <div className = {styles.foeHealthIndicator}> 
                        {monster.health} / {monster.total} 
                    </div>
                    <div id="foeDefenseBar"> </div>
                    <div id="foeHealthBar"> </div>
                </div>

            </div>  
        </div>        
    );
}


export default FoeZone;
