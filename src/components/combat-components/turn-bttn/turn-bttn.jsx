import React from 'react';
import styles from './turn-bttn.scss'

// import { usePlayer, playCard } from '../../ducks/player';
import { useDispatch } from 'react-redux'

import { endTurn } from '../../../ducks/combat'



const TurnBttn = () =>{
    // const player = usePlayer();
    const dispatch = useDispatch();

    const onBttnClick = () =>  dispatch(endTurn());

    return(
        <button id="turnBttn" onClick={onBttnClick} className = {styles.devButton}>
            [ END TURN ]
        </button>
    );
}


export default TurnBttn;
