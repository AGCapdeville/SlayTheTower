import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";


import ReduxThunk from 'redux-thunk'; 



// Alter Health, Energy & Armor Actions:
export const updatePlayer = createAction('player/UPDATE_PLAYER');
// export const newRound = createAction('player/NEW_ROUND');

// Deck Actions:
export const setDeck = createAction('player/SET_DECK');
export const drawCard = createAction('player/DRAW_CARD');
export const playCard = createAction('player/PLAY_CARD');

export const playIndexedCard = createAction('player/PLAY_INDEXED_CARD')


export const voidCard = createAction('player/VOID_CARD');
export const shuffleDeck = createAction('player/SHUFFLE_DECK');

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

const reducePlayIndexedCard = ({ discard, hand, ...rest }, { payload }) => {

    // console.log("payload:", payload)

    console.log("payload card:", hand[payload])

    // console.log('state:', rest)

    // const card = hand[payload];
    // const actions = card.action;
    // const energyCost = actions.enegy;
    // const target = actions.target;
    // const effect = actions.effect;
    // const power = actions.power;

    // console.log("Target: ", target, " Effect: ", effect, " Power: ", power)



    return { ...rest, hand, discard }
}

// action: {
//     target: ['hero'],
//     effect: ['heal'],
//     power: [8]
// },


export default handleActions({
    // new:
    [drawHand]: (state) => ({...state, deck: state.deck.slice( 0, state.deck.length -5), hand: [...state.hand, ...state.deck.slice(-5)]}),
    [shuffleDeck]: (state) => ({...state, deck: shuffle(state.deck)}),
    [updatePlayer]: (state, action) => ({ ...state.player, ...action.payload }),
    [setDeck]: (state, action) => ({...state, deck: action.payload }),
    
    [drawCard]: reduceDrawCard,
    [playCard]: reducePlayCard,

    [playIndexedCard]: reducePlayIndexedCard,

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

