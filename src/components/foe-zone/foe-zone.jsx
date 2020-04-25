import React from 'react';
import { useFoe } from '../../ducks/foe'
import styles from "./foe-zone.module.scss";



const FoeZone = () =>{

    const foe = useFoe();
    
    return(
        <div className={styles.foeZone}>
            <div className = {styles.foe}>

                <div className={styles.telegraph}> {foe.telegraphing} </div>
                <div className={styles.foeTitle}> {foe.name} </div>
                <img className = {styles.foeImg} src={foe.art} alt="foe img"/>

                <div className = {styles.foeHealthBorder}> 
                    <div className = {styles.foeHealthIndicator}> 
                        {foe.health} / {foe.totalHealth} 
                    </div>
                <div className = {styles.foeHealthBar} />
                </div>

            </div>  
        </div>        
    );
}


export default FoeZone;
