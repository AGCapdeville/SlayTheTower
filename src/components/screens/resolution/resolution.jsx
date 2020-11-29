import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./resolution.module.scss";
import { useGameState, updateGameState } from '../../../ducks/game_state'

import { resetDeck, updatePlayer, addCard, shuffleDeck, removeAilgments, removeDeckAfflictions } from '../../../ducks/player';

import { updateScreen } from '../../../ducks/screen';

import { updateMap } from '../../../ducks/map';

import cardStyle from '../../card/card.module.scss';
import Card from '../../card';


function rollDice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

function genPathLength(){
    let length = rollDice(1,4)
    let onesOdds = rollDice(0,50)
  
    if (onesOdds == 0 && length == 1){
      return 1
    }
    if (onesOdds < 1 && length == 3){
      return 4
    }
    return length
}
  
function genEvent( roll, fightOdds, elieteOdds, bonfireOdds, trialOdds, shopOdds){
    if ( roll < fightOdds){
      return {  fieldEvent: '⚔️' }
    }else if ( roll < elieteOdds ){
      return {  fieldEvent: '💢' }
    }else if ( roll < bonfireOdds ){
      return {  fieldEvent: '🔥' }
    }else if ( roll < trialOdds ){
      return {  fieldEvent: '❗' }
    }else if ( roll < shopOdds){
      return {  fieldEvent: '🕋' }
    }else{
      return {  fieldEvent: '⚔️' }
    }
}
  
function genPath( pathLength, setEvent ){
    if ( setEvent ){
        
        let events = []
        for (let e = 0; e < pathLength; e++) {
        let roll = rollDice(0,101);
        events.push(genEvent(roll, 70, 85, 100, 0, 0))
        }

        return({
        fieldEvent: setEvent,
        fieldPaths: pathLength,
        fieldPathEvents: events
        })

    }else{

        // generate paths
        let events = []
        for (let e = 0; e < pathLength; e++) {
        let roll = rollDice(0,101);
        events.push(genEvent(roll, 70, 90, 100))
        }

        // generate field of said paths
        let roll = rollDice(0,101);
        return({
        fieldEvent: genEvent(roll, 70, 80, 87, 95, 100).fieldEvent,
        fieldPaths: pathLength,
        fieldPathEvents: events
        })

    }
}
  
function fillPaths( numberOfPaths, setEvent) {
const paths = []

for (let p = 0; p < numberOfPaths; p++) {
    // Gen a new number of paths per field choice
    paths.push( genPath( genPathLength(), setEvent ))
}

return paths
}

function startingField(startingPaths){
    let newField = {
      fieldEvent: 'START',
      fieldPaths: startingPaths,
      fieldPathEvents: fillPaths(startingPaths, '⚔️'),
      count: 0
    }
    return newField
}


const ResolutionScreen = () => {
    
    const dispatch = useDispatch();
    const gameState = useGameState();   
    
    let header = ''
    let body = ''
    let bttn = ''

    dispatch(resetDeck());    
    dispatch(shuffleDeck());
    dispatch(removeAilgments());
    dispatch(removeDeckAfflictions()); 
    
    const onCardClick = (card) =>  {

        dispatch( addCard(card) );   
        dispatch( updateGameState({resolutionCards:[]}) );
        dispatch( updateGameState({screen:'Map'}) );
        dispatch( updateScreen('Map') );
    };

    const onSkip = () => {

        dispatch( updateGameState({resolutionCards:[]}) );
        dispatch( updateGameState({screen:'Map'}) );
        dispatch( updateScreen('Map') );
    }

    const gameComplete = () => {
        dispatch( updateGameState({resolutionCards:[]}) );
        dispatch( updateGameState({screen:'Title'}) );
        dispatch( updateScreen('Title') );
    }

    if ( gameState.floorComplete ) {
        return (
            <div className={styles.gameScreen}>
                <div className={styles.menuContainer}>
        
                    <div className={styles.menuHeader}>
                        Game Complete
                    </div>
        
                    <div className={styles.menuBody}>
                        <div className={styles.bodyText}>
                            Thanks for playing!
                        </div>

                    </div>

                    <div className={styles.menuFooter}>
                        <div className={styles.menuOption} onClick={() => gameComplete() }>
                            Return To Title Screen
                        </div>
                    </div>
        
                </div>
            </div>
        );
    } else if ( !gameState.defeat ) {
        header = 'VICTORY'
        body = `You found G: +` + gameState.loot + `\n`
        bttn = 'Skip'
        dispatch(updatePlayer({gold:gameState.playerGold + gameState.loot}))

        return (
            <div className={styles.gameScreen}>
                <div className={styles.menuContainer}>
        
                    <div className={styles.menuHeader}>
                        {header}
                    </div>
        
                    <div className={styles.menuBody}>
                        <div className={styles.bodyText}>{body}</div>

                        <div className={styles.rewardText}> Choose A Card: </div>

                        <div className={styles.cardContainer}>
                            {gameState.resolutionCards.map( (card, index) =>
                                <button key={index} className={cardStyle.cardButton} onClick={ () => onCardClick(card) }>
                                    <div className={cardStyle.card}>
                                        <Card 
                                            cardData={card} 
                                            combat={true}
                                        />
                                    </div>
                                </button>              
                            )}
                        </div>

                    </div>

        
                    <div className={styles.menuFooter}>
                        <div className={styles.menuOption} onClick={() => onSkip() }>
                            {bttn}
                        </div>
                    </div>
        
                </div>
            </div>
        );

    } else {
        header = 'GAME OVER'
        body = ''
        bttn = 'Return to title screen'
        
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
                                    dispatch(updateMap(startingField(3)));
                                    dispatch(updateScreen({count:0}));

                                    dispatch(updateGameState({screen:'Title'}));
                                    dispatch(updateScreen('Title'));
                                }
                            }>
                            {bttn}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    
}


export default ResolutionScreen;

