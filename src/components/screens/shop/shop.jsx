import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./shop.module.scss";

import { useGameState } from '../../../ducks/game_state'
import { usePlayer, updatePlayer } from '../../../ducks/player';
import { updateScreen } from '../../../ducks/screen';
import { updateGameState } from '../../../ducks/game_state';

// import cardData from '../../../game-data/card-data'

import Card from '../../card'
import { updateShop, setupShop, useShop } from '../../../ducks/shop';

const ShopScreen = () => {

    const dispatch = useDispatch();
    const gameState = useGameState();
    const shop = useShop();
    const player = usePlayer();
 
        
    return (
    <div className={styles.screenContainer}>
        <div className={styles.screen}>

            <h1>SHOP</h1>
            <br />
            <div>
                G: {player.gold}
            </div>
            <br />

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {shop.shopCards.map( (cardData, index) => 
                        <button key={index} className={styles.customButton}>
                            <Card cardData={cardData} combat={false} />
                        </button>
                    )}
                </div>
            </div>
            <br />

            <div>
                <button onClick={() => 
                        {
                            dispatch( updateGameState({screen:'Map'}) );
                            dispatch( updateScreen('Map') ) 
                        }
                    }>
                    RETURN TO MAP
                </button>
            </div>

        </div>
    </div>
    );
    
}


export default ShopScreen;

