import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./end.module.scss";
import { useClimbState } from '../../../ducks/climbState'


import { setScreen } from '../../../ducks/screen';


// need to import reward cards...
// select 3 random reward cards and display them.


// for reward: body
// import { drawHand, shuffleDeck, useCard } from '../../ducks/player';


const EndScreen = () => {

    const dispatch = useDispatch();
    const climbState = useClimbState();

    let header = ''
    let body = ''
    let bttn = ''

    if ( !climbState.defeat ) {
        header = 'VICTORY'
        body = 'You Won! Unfortunately there is no rewards yet... But they are on there way!'
        bttn = 'CONTINUE'
    } else {
        header = 'DEFEAT'
        body = 'You Lost!'
        bttn = 'EXIT'
    }

    return (
    <div className={styles.gameScreen}>
        <div className={styles.menuContainer}>

            <div className={styles.menuHeader}>
                {header}
            </div>

            <div className={styles.menuBody}>
                {body}
            </div>

            <div className={styles.menuFooter}>
                <div className={styles.menuOption} onClick={() => dispatch(setScreen('Title'))}>
                    {bttn}
                </div>
            </div>

        </div>
    </div>
    );
    
}


export default EndScreen;

