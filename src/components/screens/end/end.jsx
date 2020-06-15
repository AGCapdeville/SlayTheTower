import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./end.module.scss";


import { setScreen } from '../../../ducks/screen';



// need to import reward cards...
// select 3 random reward cards and display them.


// for reward:
// import { drawHand, shuffleDeck, useCard } from '../../ducks/player';


// import { useFoe } from '../../../ducks/foe'

const EndScreen = () => {

    // const { health: foeHealth } = useFoe();
    const dispatch = useDispatch();

    return (
    <div className={styles.game}>
        <p>
            REWARD SCREEN
        </p>

        <div className={styles.menu} onClick={() => dispatch(setScreen('Title'))}> END </div>
    </div>
    );
    
}


export default EndScreen;

