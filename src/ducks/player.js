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
export const resetDeck = createAction('player/RESET_DECK');

// Hand actions
export const drawHand = createAction('player/DRAW_HAND');

// deck altering
export const addCard = createAction('player/ADD_CARD');
export const addCardDiscard = createAction('player/ADD_CARD_DISCARD');

// Ailgment
export const removeAilgments = createAction('player/REMOVE_AILGMENTS');
export const addAilgments = createAction('player/ADD_AILGMENTS');

// Curses
export const removeCurses = createAction('player/REMOVE_CURSES');

// Afflictions
export const removeDeckAfflictions = createAction('player/REMOVE_DECK_AFFLICTIONS');

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
const reduceResetDeck = ({ deck, hand, discard, voidDeck, ...rest }) => {
    let resetDeck = [...deck, ...hand, ...discard, ...voidDeck];
    console.log('reset deck:', resetDeck);
    return { ...rest, deck: resetDeck, hand:[], voidDeck:[], discard:[] }
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
const reducePlayIndexedCard = ({ voidDeck, discard, hand, ...rest } , {payload}) => {
    const grabCard = hand[payload]
    hand.splice(payload, 1)

    if(grabCard.exhaust){
        return { ...rest, voidDeck: [...voidDeck, grabCard], hand: hand, discard: discard}
    }else{
        return { ...rest, voidDeck: voidDeck, hand: hand, discard: [...discard, grabCard]}
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
const reduceAddCardDiscard = ({discard, ...rest}, {payload}) => {
    const newDiscard = [...discard, payload]
    return { ...rest, discard: newDiscard }
}
const reduceAddAilgments = ({offenseHeroAilgments, offenseHeroAilgmentsDuration, utilityHeroAilgments, utilityHeroAilgmentsDuration, defenseHeroAilgments, defenseHeroAilgmentsDuration, ...rest}, {payload}) => {

    console.log("Ailgments Payload:",payload)

    let indexOfStun = -1;

    switch (payload.target) {

        case 'mage':
            indexOfStun = utilityHeroAilgments.findIndex( aligment => aligment == "stun" )
            if ( indexOfStun != -1 ){
                utilityHeroAilgmentsDuration[indexOfStun] =  utilityHeroAilgmentsDuration[indexOfStun] + payload.duration;
            }else{
                utilityHeroAilgments = [...utilityHeroAilgments, payload.effect]
                utilityHeroAilgmentsDuration = [...utilityHeroAilgmentsDuration, payload.duration]
            }
            break;
        case 'sword':
            indexOfStun = offenseHeroAilgments.findIndex( aligment => aligment == "stun" );
            if ( indexOfStun != -1 ){
                offenseHeroAilgmentsDuration[indexOfStun] =  offenseHeroAilgmentsDuration[indexOfStun] + payload.duration;
            }else{
                offenseHeroAilgments = [...offenseHeroAilgments, payload.effect]
                offenseHeroAilgmentsDuration = [...offenseHeroAilgmentsDuration, payload.duration]
            }
            break;
        case 'shield':
            indexOfStun = defenseHeroAilgments.findIndex( aligment => aligment == "stun" )
            if ( indexOfStun != -1 ){
                defenseHeroAilgmentsDuration[indexOfStun] =  defenseHeroAilgmentsDuration[indexOfStun] + payload.duration;
            }else{
                defenseHeroAilgments = [...defenseHeroAilgments, payload.effect]
                defenseHeroAilgmentsDuration = [...defenseHeroAilgmentsDuration, payload.duration]
            }
            break;
        default:
            console.log('ERROR default::',payload.target)

    }
    return { ...rest, offenseHeroAilgments: offenseHeroAilgments, offenseHeroAilgmentsDuration: offenseHeroAilgmentsDuration, utilityHeroAilgments: utilityHeroAilgments, utilityHeroAilgmentsDuration: utilityHeroAilgmentsDuration, defenseHeroAilgments: defenseHeroAilgments, defenseHeroAilgmentsDuration: defenseHeroAilgmentsDuration }
}
const reduceRemoveAilgments = ({offenseHeroAilgments, offenseHeroAilgmentsDuration, utilityHeroAilgments, utilityHeroAilgmentsDuration, defenseHeroAilgments, defenseHeroAilgmentsDuration, ...rest}) => {
    return { ...rest, offenseHeroAilgments: [], offenseHeroAilgmentsDuration: [], utilityHeroAilgments: [], utilityHeroAilgmentsDuration: [], defenseHeroAilgments: [], defenseHeroAilgmentsDuration: [] }
}
const reduceRemoveDeckAfflictions = ({ deck, hand, discard, ...rest}) => {
    let newDeck = deck.filter( card => {
        if ( !(card.type === 'affliction') ){
            return card
        }
    })
    let newHand = hand.filter( card => {
        if ( !(card.type === 'affliction') ){
            return card
        }
    })
    let newDiscard = discard.filter( card => {
        if ( !(card.type === 'affliction') ){
            return card
        }
    })

    return {...rest, deck : newDeck, hand: newHand, discard: newDiscard}
}
const reduceRemoveCurses = ({deck, ...rest}) => {
    let newDeck = deck.filter( card => {
        if ( !(card.type == 'curse') ){
            return card
        }
    })

    return {...rest, deck : newDeck}
}


export default handleActions({
    [drawHand]: (state) => ({...state, deck: state.deck.slice( 0, state.deck.length -5), hand: [...state.hand, ...state.deck.slice(-5)]}),
    [shuffleDeck]: (state) => ({...state, deck: shuffle(state.deck)}),
    [updatePlayer]: (state, action) => ({ ...state, ...action.payload }),
    [setDeck]: (state, action) => ({...state, deck: action.payload }),
    
    [resetDeck]: reduceResetDeck,
    [removeAilgments]: reduceRemoveAilgments,
    [addAilgments]: reduceAddAilgments,

    [removeDeckAfflictions]: reduceRemoveDeckAfflictions,
    [removeCurses]: reduceRemoveCurses,

    [drawCard]: reduceDrawCard,
    [playCard]: reducePlayCard,
    
    [playIndexedCard]: reducePlayIndexedCard,
    [discardHand]: reduceDiscardHand,

    [addCard]: reduceAddCard,
    [addCardDiscard]: reduceAddCardDiscard,

    [voidCard]: (state, action) => ({...state, hand: state.hand.slice(action.payload, 1), voidPile: [...state.void, state.hand.slice(action.payload, 1)]}),
}, initialState);


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

    const offHeroStanding = ((state.player.offenseHeroStatus === 'standing' && !state.player.offenseHeroAilgments.includes('stun') ) ? true : false);
    const defHeroStanding = ((state.player.defenseHeroStatus === 'standing' && !state.player.defenseHeroAilgments.includes('stun') ) ? true : false);
    const utilHeroStanding = ((state.player.utilityHeroStatus === 'standing' && !state.player.utilityHeroAilgments.includes('stun') ) ? true : false);

    switch (requiredHeros) {
        case 'a':
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
    let transitionTime = 500;
    bodyElement.animate([
        {opacity: 1},
        {opacity: 0},
        {opacity: .75},
        {opacity: .5},
        {opacity: 0},
        {opacity: .75},
        {opacity: 1}

    ], {
        duration: transitionTime,
        iterations: 1
    });
}

function shakeHero(state, requiredHero, mage, koMage, sword, shield){

    const offHeroStanding = ((state.player.offenseHeroStatus === 'standing' && !state.player.offenseHeroAilgments.includes('stun') ) ? true : false);
    const defHeroStanding = ((state.player.defenseHeroStatus === 'standing' && !state.player.defenseHeroAilgments.includes('stun') ) ? true : false);
    const utilHeroStanding = ((state.player.utilityHeroStatus === 'standing' && !state.player.utilityHeroAilgments.includes('stun') ) ? true : false);

    switch (requiredHero) {
        case 'o':
            leftRightShake(sword);
            break;
        case 'u':
            leftRightShake(mage);
            leftRightShake(koMage);
            break;
        case 'd':
            leftRightShake(shield);
            break;
        case 'do':
            if (!defHeroStanding){
                leftRightShake(shield);
            }
            if (!offHeroStanding){
                leftRightShake(sword);
            }
            break;
        case 'du':
            if (!defHeroStanding){
                leftRightShake(shield);
            }
            if (!utilHeroStanding){
                leftRightShake(mage);
                leftRightShake(koMage)
            }
            break;
        case 'ou':
            if (!offHeroStanding){
                leftRightShake(sword);
            }
            if (!utilHeroStanding){
                leftRightShake(mage);
                leftRightShake(koMage)
            }
            break;
        case 'e':
            if (!offHeroStanding){
                leftRightShake(sword);
            }
            if (!defHeroStanding){
                leftRightShake(shield);
            }
            if (!utilHeroStanding){
                leftRightShake(mage);
                leftRightShake(koMage)
            }
            break;
    }
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

    const card = state.player.hand[cardIndex]
    const energyCost = card.energy;

    const requiredHero = card.requiredHero;
    const standing = checkStanding(state, requiredHero);     
    const foeDefense = state.monster.defense

    let cardSounds = document.createElement('audio');

    let mageBody = document.getElementById('mageBody');
    let koMageBody = document.getElementById('koMageBody');
    let shieldBody = document.getElementById('shieldBody');
    let swordBody = document.getElementById('swordBody');

    let energyText = document.getElementById('heroEnergyText');

    let aCursedCard = card.type === 'curse' ? true : false;


    if (energyCost <= state.player.energy && !aCursedCard) {
        cardSounds.src = cardSuccess;
        cardSounds.play();

        if (standing){
        
            moveHero(card.requiredHero, mageBody, shieldBody, swordBody);
            const newEnergy = state.player.energy - energyCost

            for (let i = 0; i < card.action.target.length; i++) {

                if (card.action.target[i] == "foe"){
                    if (card.action.effect[i] == 'damage'){
                        damageFlash(document.getElementById('monsterOuterContainer'))
                        const trample = foeDefense - card.action.power[i];
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
                    }else if (card.action.effect[i] == 'stun'){
                        state.monster.aligment.push('stun');
                        state.monster.aligmentDuration.push(card.action.power[i]);
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
                        dispatch(updatePlayer({ energy: newEnergy }))
                    }
                }else if (card.action.target[i] == "player"){
                    if (card.action.effect[i]=="heal"){
                        const newPlayerHealth = ( parseInt(state.player.health) + parseInt(card.action.power[i]) ) > parseInt(state.player.maxHealth) ? (parseInt(state.player.maxHealth)) : (parseInt(state.player.health) + parseInt(card.action.power[i]));
                        dispatch(updatePlayer({ health: newPlayerHealth, energy: newEnergy }))
                        dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' healing '+card.action.power[i]+' party health' ) }))
                    }else if (card.action.effect[i] == "mend"){
                        dispatch(removeDeckAfflictions()); 
                    } else if (card.action.effect[i] == "defense"){
                        const defense = card.action.power[i]
                        const newPlayerDefense = parseInt(state.player.defense) + parseInt(defense)
                        dispatch(updatePlayer({ defense: newPlayerDefense, energy: newEnergy}))
                        dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' gaining '+defense+' party defense' ) }))
                    } else if (card.action.effect[i] == 'delayUtility'){
                        state.player.utilityHeroAilgments.push('stun')
                        state.player.utilityHeroAilgmentsDuration.push(card.action.power[i])
                        dispatch(updatePlayer({ energy: newEnergy }))
                    } else if (card.action.effect[i] == 'delayDefense'){
                        state.player.defenseHeroAilgments.push('stun')
                        state.player.defenseHeroAilgmentsDuration.push(card.action.power[i])
                        dispatch(updatePlayer({ energy: newEnergy }))
                    } else if (card.action.effect[i] == 'delayOffense'){
                        state.player.offenseHeroAilgments.push('stun')
                        state.player.offenseHeroAilgmentsDuration.push(card.action.power[i])
                        dispatch(updatePlayer({ energy: newEnergy }))
                    } else if (card.action.effect[i] == 'damage'){
                        state.player.health -= card.action.power[i]
                        dispatch(updatePlayer({ energy: newEnergy }))
                    }

                } else if (card.action.target[i] == "affliction"){
                    dispatch(updatePlayer({ energy: newEnergy }))
                } else{
                    // something
                }
            }

            dispatch(playIndexedCard(cardIndex))

        }else{
            cardSounds.src = cardError;
            cardSounds.play();
            shakeHero(state, requiredHero, mageBody, koMageBody, swordBody, shieldBody )
        }
    } else {
        cardSounds.src = cardError;
        cardSounds.play();
        leftRightShake(energyText);
    }


}



