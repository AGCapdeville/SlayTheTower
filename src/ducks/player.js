import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { updateFoe } from './foe';

// TODO: clean up and organize

// Alter Health, Energy & Armor Actions:
export const updatePlayer = createAction('player/UPDATE_PLAYER');
// export const newRound = createAction('player/NEW_ROUND');

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

const initialState = {}


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

/**
 * 
 * {
 *  name,
 *  health,
 *  deck,
 *  health,
 *  gold,
 * }
 */

const reduceResetDeck = ({ hand, deck, discard, ...rest }) => {
    const newDiscard = [...discard, ...hand ]
    const newDeck = [...deck, ...newDiscard]
    return { ...rest, hand: [], deck: newDeck, discard: [] }
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
    console.log(payload)

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

    [voidCard]: (state, action) => ({...state, hand: state.hand.slice(action.payload, 1), voidPile: [...state.void, state.hand.slice(action.payload, 1)]}),
}, initialState);

// notes:
// might need to see if I can set initialStates later ???????
// [newRound]: (state) => ({...state, energy: initialState.energy, armor: initialState.armor}),
// deck handle:


// how we grab data from the store
const selectPlayer = createSelector(
    state => state.player,
    player => player   
)

export const usePlayer = () => useSelector(selectPlayer);



// Async Actions
export const applyCard = (cardIndex) => (dispatch, getState) => {
    const state = getState();


    const card = state.player.hand[cardIndex]
    const energyCost = card.energy;
    const foeArmor = state.foe.armor

    if (energyCost <= state.player.energy) {
        const newEnergy = state.player.energy - energyCost
        if (card.action.target=="foe"){
            if (card.action.effect=="damage"){
                const damage = card.action.power
                const trample = foeArmor - damage
                if (trample < 0) {
                    const newFoeHealth = parseInt(state.foe.health) + parseInt(trample)
                    dispatch(updateFoe({ health: newFoeHealth, armor: 0}))
                }else{
                    const newFoeArmor = trample
                    dispatch(updateFoe({ armor: newFoeArmor }))
                }
                dispatch(updatePlayer({ energy: newEnergy }))
            }
        } else {
            if (card.action.effect=="heal"){
                const heal = card.action.power
                const newPlayerHealth = parseInt(state.player.health) + parseInt(heal)
                dispatch(updatePlayer({ health: newPlayerHealth, energy: newEnergy }))
            } else if (card.action.effect=="armor"){
                const armor = card.action.power
                const newPlayerArmor = parseInt(state.player.armor) + parseInt(armor)
                dispatch(updatePlayer({ armor: newPlayerArmor, energy: newEnergy}))
            }
        }
        dispatch(playIndexedCard(cardIndex))
    } else {
        console.log("! Not Enough Energy !")
    }


}



