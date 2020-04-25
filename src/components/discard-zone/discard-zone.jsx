import React from 'react';
import styles from './discard-zone.module.scss'

// import Encounter from '../../game-mechanics/encounter';
import { usePlayer } from '../../ducks/player';


const DiscardZone = () =>{
    const player = usePlayer();
    return(

        <div className = {styles.discardZone}>
            <div className = {styles.void}> 
                {player.void.length}
            </div>
            <div className = {styles.discard}>
                {player.discard.length}
            </div>
        </div>
    );
}


export default DiscardZone;
