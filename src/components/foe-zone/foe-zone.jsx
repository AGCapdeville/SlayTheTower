import React from 'react';
import foe, { useFoe } from '../../ducks/foe'
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

function getTelegraph(foe){
    try{
        // debugger;
        console.log("contents:", foe.telegraphing)
        const answer = foe.telegraphing[0].effect + " "+ foe.telegraphing[0].power
        return answer
    }catch{
        const answer = "..."
        return answer
    }
}

const FoeZone = () =>{

    const { health: foeHealth } = useFoe();
    const { total: foeMax } = useFoe();
    const foe = useFoe();
    // const mv = foe.moves
    // console.log( "test:", foe.moves ) 
    console.log("answer:", getTelegraph(foe))
    const telegraph = getTelegraph(foe)
    

    useEffect(() => {
        updateFoeHealthBar(foeHealth, foeMax)
    }, [foeHealth]);
    
    return(
        <div className={styles.foeZone}>
            <div className = {styles.foe}>

                <div className={styles.telegraph}> {telegraph} </div>
                <div className={styles.foeTitle}> {foe.name} </div>
                <img className = {styles.foeImg} src={foe.art} alt="foe img"/>

                <div className = {styles.foeHealthBorder}> 
                    <div className = {styles.foeHealthIndicator}> 
                        {foe.health} / {foe.total} 
                    </div>
                    <div id="foeHealthBar"> </div>
                    {/* className = {styles.foeHealthBar} */}
                </div>

                {/* {document.getElementById("foeHealthBar").style.width= "5"} */}

            </div>  
        </div>        
    );
}


export default FoeZone;
