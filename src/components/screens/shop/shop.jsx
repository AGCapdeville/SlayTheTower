import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from "./shop.module.scss";
import cardStyle from '../../card/card.module.scss';


import { useGameState } from '../../../ducks/game_state'
import { usePlayer, updatePlayer, addCard } from '../../../ducks/player';
import { updateScreen } from '../../../ducks/screen';
import { updateGameState } from '../../../ducks/game_state';

// import cardData from '../../../game-data/card-data'

import Card from '../../card'
import { useShop, boughtCard } from '../../../ducks/shop';
import coindSound from '../../../sound_clips/coins_purchase.mp3'
import bearGrunt from '../../../sound_clips/bearGrunt.mp3'
function buyCard(card, index, dispatcher, player, sound){
    if ( player.gold - card.cost >= 0){
        // coin sound
        sound.src = coindSound;
        sound.volume = .3;
        sound.play();
        
        dispatcher(addCard(card));
        dispatcher(boughtCard(index));
        dispatcher(updatePlayer({gold: player.gold - card.cost}))
    }else{
        // error sound
        sound.src = bearGrunt;
        sound.volume = .3;
        sound.play();
    }
}



const ShopScreen = () => {

    const dispatch = useDispatch();
    const gameState = useGameState();
    const shop = useShop();
    const player = usePlayer();
 
    let sounds = document.createElement('audio');

    return (
    <div className={styles.screenContainer}>
        <div className={styles.screen}>

            <h1>SHOP</h1>

            <br />


            <img style={{width:'150px'}} src="https://i.imgur.com/4Jbrggw.png"></img>

            
            <br />
            
            <div style={{color:'gold'}}>
                G: {player.gold}
            </div>

            <br />

            <div style={{display: 'flex', flexDirection: 'column'}}>

                <div style={{display: 'flex', flexDirection: 'row'}}>

                    {shop.shopCards.map( (card, index) => 
                        <button key={index} className={styles.cardButton} onClick={() => {buyCard(card, index, dispatch, player, sounds)}}>
                            <div className={cardStyle.card}>
                                <Card cardData={card} combat={false} />
                            </div>
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

