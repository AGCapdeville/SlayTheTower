import React from 'react';
import foe, { useFoe } from '../../../../ducks/foe'
import styles from "./foe-zone.module.scss";
import { useEffect } from 'react';

function updateFoeHealthBar(foeHealth, foeMax){
    var x = document.getElementById("foeHealthBar")
    x.style.backgroundColor = "red"

    if (foeHealth == foeMax){
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

    if (defense == 0){
        x.style.height = "2vh"
        x.style.width = "0vw"
    }

    if (defense > 0){
        // const dmg = ((foeHealth/foeMax)*20)
        const newDefense = ((defense/100)*20)
        x.style.width = newDefense + "vw"        
    }
}

function getTelegraph(foe){
    
    const effect = foe.telegraphing[0].effect;
    const power = foe.telegraphing[0].power;
    
    // console.log('effect:', effect);

    if (effect[0] === "damage"){
        return ('🔪 '+power);
    }else if (effect[0] === "defense"){
        return ('🛡️ '+power);
    }else{
        return '...';
    }

}

const FoeZone = () => {

    const { health: foeHealth } = useFoe();
    const { total: foeMax } = useFoe();
    const { defense: foeDefense } = useFoe();
    const foe = useFoe();
    const telegraph = getTelegraph(foe)

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
                <div className={styles.foeTitle}> {foe.name} </div>
                <img id={'foeBody'} className = {styles.foeImg} src={foe.art} alt="foe img"/>

                <div className = {styles.foeHealthBorder}> 
                    <div className = {styles.foeHealthIndicator}> 
                        {foe.health} / {foe.total} 
                    </div>
                    <div id="foeDefenseBar"> </div>
                    <div id="foeHealthBar"> </div>
                </div>

                {/* {document.getElementById("foeHealthBar").style.width= "5"} */}

            </div>  
        </div>        
    );
}


export default FoeZone;
