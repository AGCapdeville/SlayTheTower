import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./resolution.module.scss";
import { useGameState } from '../../../ducks/game_state'

import { usePlayer, updatePlayer } from '../../../ducks/player';

import { updateScreen } from '../../../ducks/screen';
import { updateGameState } from '../../../ducks/game_state';


// need to import reward cards...
// select 3 random reward cards and display them.


// for reward: body
// import { drawHand, shuffleDeck, useCard } from '../../ducks/player';


const ResolutionScreen = () => {

    const dispatch = useDispatch();
    const gameState = useGameState();

    // console.log(player.gold)

    let header = ''
    let body = ''
    let bttn = ''
        
    if ( !gameState.defeat ) {
        header = 'VICTORY'
        body = `You found G: +` + gameState.loot + ` \n !!! Cards to come later...`
        bttn = 'CONTINUE'
        dispatch(updatePlayer({gold:gameState.playerGold + gameState.loot}))

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
                <div className={styles.menuOption} onClick={() => 
                        {
                            dispatch( updateGameState({screen:'Map'}) );
                            dispatch( updateScreen('Map') );
                        }
                    }>
                    {bttn}
                </div>
            </div>

        </div>
    </div>
    );
    
}


export default ResolutionScreen;

