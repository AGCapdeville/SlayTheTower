import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { updateMonster } from './monster';

import { logCombat } from './combat';

// sounds clips
import cardSuccess from '../sound_clips/play_card_zapsplat_foley.mp3';
import cardError from '../sound_clips/error_sound.mp3';

// Alter Health, Energy & Defense Actions:
export const updatePlayer = createAction('player/UPDATE_PLAYER');

// Deck Actions:
export const setDeck = createAction('player/SET_DECK');
export const drawCard = createAction('player/DRAW_CARD');
export const playCard = createAction('player/PLAY_CARD');

export const playIndexedCard = createAction('player/PLAY_INDEXED_CARD');
export const discardHand = createAction('player/DISCARD_HAND');

export const voidCard = createAction('player/VOID_CARD');
export const shuffleDeck = createAction('player/SHUFFLE_DECK');
export const resetDeck = createAction('player/RESET_DECK')

// Hand actions
export const drawHand = createAction('player/DRAW_HAND');

// deck altering
export const addCard = createAction('player/ADD_CARD')


const initialState = {
    deck: [],
    hand: [],
    discard: [],
    voidDeck: []
}


function shuffle(deck) {
    var j, x, i
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = deck[i]
        deck[i] = deck[j]
        deck[j] = x
    }
    return deck
}

const reduceResetDeck = ({ hand, deck, discard, voidDeck, ...rest }) => {
    const resetDeck = [...deck, ...discard, ...hand, ...voidDeck]
    return { ...rest, hand:[], deck:resetDeck, voidDeck:[], discard:[] }
}

const reduceDrawCard = ({ discard, deck, hand, ...rest }) => {
    if ( deck.length == 0 ){
        if ( discard.length == 0 ){
            return { ...rest, discard, deck, hand}
        } else {
            const shuffledDiscard = shuffle(discard)
            const grabCard = shuffledDiscard[shuffledDiscard.length-1]
            const newDeck = shuffledDiscard.slice(0, shuffledDiscard.length-1)        
            const newHand = [...hand, grabCard]
            return { ...rest, hand: newHand, deck: newDeck, discard: [] }
        }
    } else {
        return { ...rest, hand: [...hand, deck[deck.length-1]], deck: deck.slice( 0, deck.length -1), discard }
    }
}

const reducePlayCard = ({ discard, hand, ...rest }) => {
    const emptyHand = hand.length < 1;
    
    if (!emptyHand){
        const newHand =  hand.slice( 0, hand.length-1)
        const newDiscard = [...discard, hand[hand.length-1] ]
        return { ...rest, hand: newHand, discard: newDiscard}
    }else{
        return { ...rest, hand, discard}
    }
}

const reducePlayIndexedCard = ({ discard, hand, ...rest } , {payload}) => {
    const emptyHand = hand.length < 1;

    if (!emptyHand){
        const grabCard = hand[payload]
        hand.splice(payload, 1)
        const newHand = hand
        const newDiscard = [...discard, grabCard]
        return { ...rest, hand: newHand, discard: newDiscard}
    }else{
        return { ...rest, hand, discard}
    }
}

const reduceDiscardHand = ({ discard, hand, ...rest }) => {
    const emptyHand = hand.length < 1;

    if (!emptyHand){
        const newHand = []
        const newDiscard = [...discard, ...hand ]
        return { ...rest, hand: newHand, discard: newDiscard}
    }else{
        return { ...rest, hand, discard}
    }
}

const reduceAddCard = ({ deck, ...rest }, {payload}) => {
    const newDeck = [...deck, payload]
    return { ...rest, deck: newDeck }
}

export default handleActions({
    [drawHand]: (state) => ({...state, deck: state.deck.slice( 0, state.deck.length -5), hand: [...state.hand, ...state.deck.slice(-5)]}),
    [shuffleDeck]: (state) => ({...state, deck: shuffle(state.deck)}),
    [updatePlayer]: (state, action) => ({ ...state, ...action.payload }),
    [setDeck]: (state, action) => ({...state, deck: action.payload }),
    
    [resetDeck]: reduceResetDeck,

    [drawCard]: reduceDrawCard,
    [playCard]: reducePlayCard,
    
    [playIndexedCard]: reducePlayIndexedCard,
    [discardHand]: reduceDiscardHand,

    [addCard]: reduceAddCard,

    [voidCard]: (state, action) => ({...state, hand: state.hand.slice(action.payload, 1), voidPile: [...state.void, state.hand.slice(action.payload, 1)]}),
}, initialState);


// how we grab data from the store
const selectPlayer = createSelector(
    state => state.player,
    player => player   
)

export const usePlayer = () => useSelector(selectPlayer);


/* requiredHero :
// a - any hero standing
// o - off needed
// u - util needed
// d - def needed
// do - def & off needed
// ud - util & def needed
// ou - off & util needed
// e - every hero needed
*/
function checkStanding(state, requiredHeros){

    const offHeroStanding = ((state.player.offenseHeroStatus === 'standing' && !state.player.offenseHeroAilgments.includes('blind') ) ? true : false);
    const defHeroStanding = ((state.player.defenseHeroStatus === 'standing' && !state.player.defenseHeroAilgments.includes('blind') ) ? true : false);
    const utilHeroStanding = ((state.player.utilityHeroStatus === 'standing' && !state.player.utilityHeroAilgments.includes('blind') ) ? true : false);

    console.log('standing heros: off:', offHeroStanding, ', def:', defHeroStanding, ', util:',utilHeroStanding);
    console.log('req heros:',requiredHeros);

    switch (requiredHeros) {
        case 'a':
            // console.log('')
            return (offHeroStanding || defHeroStanding || utilHeroStanding);
        case 'o':
            return (offHeroStanding);
        case 'u':
            return (utilHeroStanding);
        case 'd':
            return (defHeroStanding);
        case 'do':
            return (defHeroStanding && offHeroStanding);
        case 'du':
            return (defHeroStanding && utilHeroStanding);
        case 'ou':
            return (offHeroStanding && utilHeroStanding);
        case 'e':
            return (offHeroStanding && defHeroStanding && utilHeroStanding);
    }
}

// Animations START:
function heroStrikeAnimation(heroElement){
    let transitionTime = 500;
    heroElement.animate([
        {transform: 'translate(0px,0px)'},
        {transform: 'translate(95px, 0px)'},
        {transform: 'translate(155px, 0px)'},
        {transform: 'translate(-1px, 0px)'},
        {transform: 'translate(0, 0px)'}

    ], {
        duration: transitionTime,
        iterations: 1
    });
}

function damageFlash(bodyElement){

    setTimeout( function(){
        bodyElement.style.opacity = 1;
    }, 300)
        
    setTimeout( function(){
        bodyElement.style.opacity = .75;
    }, 100)

    setTimeout( function(){
        bodyElement.style.opacity = .5;
    }, 150)
    
    setTimeout( function(){
        bodyElement.style.opacity = 0;
    }, 200)

    setTimeout( function(){
        bodyElement.style.opacity = .75;
    }, 240)

    setTimeout( function(){
        bodyElement.style.opacity = 0;
    }, 280)
    
}

function leftRightShake(element){
    let transitionTime = 250;
    element.animate([
        {transform: 'translate(0px,0px)'},
        {transform: 'translate(10px, 0px)'},
        {transform: 'translate(-10px, 0px)'},
        {transform: 'translate(0, 0px)'}
    ], {
        duration: transitionTime,
        iterations: 1
    });
}

// Animations END
function moveHero(requiredHeros, mageBody, shieldBody, swordBody){
    switch (requiredHeros) {
        case 'a':
            let choice = Math.floor(Math.random() * 3); 
            if (choice === 1) {
                heroStrikeAnimation(swordBody);
            }else if( choice === 2){
                heroStrikeAnimation(shieldBody);
            }else{
                heroStrikeAnimation(mageBody);
            }
            break;
        case 'o':
            heroStrikeAnimation(swordBody);
            break;
        case 'u':
            heroStrikeAnimation(mageBody);
            break;
        case 'd':
            heroStrikeAnimation(shieldBody);
            break;
        case 'do':
            heroStrikeAnimation(swordBody);
            heroStrikeAnimation(shieldBody);
            break;
        case 'du':
            heroStrikeAnimation(shieldBody);
            heroStrikeAnimation(mageBody);
            break;
        case 'ou':
            heroStrikeAnimation(swordBody);
            heroStrikeAnimation(mageBody);
            break;
        case 'e':
            heroStrikeAnimation(swordBody);
            heroStrikeAnimation(shieldBody);
            heroStrikeAnimation(mageBody);
            break;
    }
}

// Async Actions
export const applyCard = (cardIndex) => (dispatch, getState) => {
    const state = getState();
    // const musicDriver = state.useMusic;

    const card = state.player.hand[cardIndex]
    const energyCost = card.energy;
    const standing = checkStanding(state, card.requiredHero);     
    const foeDefense = state.monster.defense

    let cardSounds = document.createElement('audio');

    let mageBody = document.getElementById('mageBody');
    let koMageBody = document.getElementById('koMageBody');
    let shieldBody = document.getElementById('shieldBody');
    let swordBody = document.getElementById('swordBody');

    let energyText = document.getElementById('heroEnergyText');



    if (energyCost <= state.player.energy) {
        cardSounds.src = cardSuccess;
        cardSounds.play();

        if (standing){
        
            moveHero(card.requiredHero, mageBody, shieldBody, swordBody);
            const newEnergy = state.player.energy - energyCost

            for (let i = 0; i < card.action.target.length; i++) {

                if (card.action.target[i] == "foe"){
                    if (card.action.effect[i] == 'damage'){
                        const trample = foeDefense - card.action.power[i];
                        console.log('foe damage:', card.action.power[i])
                        if (trample < 0) {
                            const newFoeHealth = parseInt(state.monster.health) + parseInt(trample);
                            dispatch(updateMonster({ health: newFoeHealth, defense: 0}));
                            dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' dealing '+((-1)*(trample))+' damage.' ) }))
                        }else{
                            const newFoeDefense = trample;
                            dispatch(updateMonster({ defense: newFoeDefense }));
                            dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' dealing 0 damage.' ) }))
                        }
                        dispatch(updatePlayer({ energy: newEnergy }));
                    }else if (card.action.effect[i] == 'blind'){
                        state.monster.aligment.push('blind');
                        state.monster.aligmentDuration.push(card.action.power);
                        dispatch(updatePlayer({ energy: newEnergy }))
                    }else if (card.action.effect[i] == 'defenseTotal'){
                        const trample = foeDefense - state.player.defense;
                        if (trample < 0) {
                            const newFoeHealth = parseInt(state.monster.health) + parseInt(trample);
                            dispatch(updateMonster({ health: newFoeHealth, defense: 0}));
                            dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' dealing '+((-1)*(trample))+' damage.' ) }))
                        }else{
                            const newFoeDefense = trample;
                            dispatch(updateMonster({ defense: newFoeDefense }));
                            dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' dealing 0 damage.' ) }))
                        }
                    }
                }else if (card.action.target[i] == "player"){
                    if (card.action.effect[i]=="heal"){
                        const newPlayerHealth = ( parseInt(state.player.health) + parseInt(card.action.power[i]) ) > parseInt(state.player.maxHealth) ? (parseInt(state.player.maxHealth)) : (parseInt(state.player.health) + parseInt(card.action.power[i]));
                        dispatch(updatePlayer({ health: newPlayerHealth, energy: newEnergy }))
                        dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' healing '+card.action.power[i]+' party health' ) }))
    
                    } else if (card.action.effect[i]=="defense"){
                        const defense = card.action.power[i]
                        const newPlayerDefense = parseInt(state.player.defense) + parseInt(defense)
                        dispatch(updatePlayer({ defense: newPlayerDefense, energy: newEnergy}))
                        dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' gaining '+defense+' party defense' ) }))
                    } else if (card.action.effect[i]=='delayUtility'){
                        state.player.utilityHeroAilgments.push('blind');
                        state.player.utilityHeroAilgmentsDuration.push(card.action.power);
                        dispatch(updatePlayer({ energy: newEnergy }))
                    }

                } else {
                    //something strange?
                    console.log('effects something other than player or foe, like drawing an aditional card etc');
                }
            }

            // TARGET: FOE
            // if (card.action.target=="foe"){    

            //     // FOE DAMAGED
            //     if (card.action.effect=="damage"){

            //         const damage = card.action.power;
            //         const trample = foeDefense - damage;
            //         if (trample < 0) {
            //             const newFoeHealth = parseInt(state.monster.health) + parseInt(trample);
            //             dispatch(updateMonster({ health: newFoeHealth, defense: 0}));
            //             dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' dealing '+((-1)*(trample))+' damage.' ) }))
            //         }else{
            //             const newFoeDefense = trample;
            //             dispatch(updateMonster({ defense: newFoeDefense }));
            //             dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' dealing 0 damage.' ) }))
            //         }
            //         dispatch(updatePlayer({ energy: newEnergy }));
            //     }


            // } else {
            //     if (card.action.effect=="heal"){
            //         const heal = card.action.power
            //         const newPlayerHealth = parseInt(state.player.health) + parseInt(heal)
            //         dispatch(updatePlayer({ health: newPlayerHealth, energy: newEnergy }))
            //         dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' healing '+heal+' party health' ) }))

            //     } else if (card.action.effect=="defense"){
            //         const defense = card.action.power
            //         const newPlayerDefense = parseInt(state.player.defense) + parseInt(defense)
            //         dispatch(updatePlayer({ defense: newPlayerDefense, energy: newEnergy}))
            //         dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' gaining '+defense+' party defense' ) }))
            //     }
            // }
            dispatch(playIndexedCard(cardIndex))

        }else{
            console.log('! Required hero not standing !')
        }
    } else {
        cardSounds.src = cardError;
        cardSounds.play();
        leftRightShake(energyText);
    }


}



