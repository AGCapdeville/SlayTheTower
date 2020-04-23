import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Alter Health, Energy & Armor Actions:
export const updatePlayer = createAction('player/UPDATE_PLAYER');
// export const newRound = createAction('player/NEW_ROUND');

// Deck Actions:
export const setDeck = createAction('player/SET_DECK');
export const drawCard = createAction('player/DRAW_CARD');
export const useCard = createAction('player/USE_CARD');
export const voidCard = createAction('player/VOID_CARD');

export const shuffleDeck = createAction('player/SHUFFLE_DECK');

// Hand actions
export const drawHand = createAction('player/DRAW_HAND');

const initialState = {}


function rando(deck) {
    var j, x, i
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = deck[i]
        deck[i] = deck[j]
        deck[j] = x
    }
    return deck
}

export default handleActions({
    // new:
    [drawHand]: (state) => ({...state, deck: state.deck.slice( 0, state.deck.length - 1 - 5), hand: [...state.hand, ...state.deck.slice(-5)]}),
    [shuffleDeck]: (state) => ({...state, deck: rando(state.deck)}),

    // might need to see if I can set initialStates later ???????
    // [newRound]: (state) => ({...state, energy: initialState.energy, armor: initialState.armor}),
    // deck handle:

    [updatePlayer]: (state, action) => ({ ...state.player, ...action.payload }),

    [setDeck]: (state, action) => ({...state, deck: action.payload }),
    [drawCard]: (state) => ({...state, deck: state.deck.slice( 0, state.deck.length - 1), hand: [...state.hand, state.deck.slice(-1, 1)]}),
    [useCard]: (state, action) =>({...state, hand: state.hand.slice(action.payload, 1), discard: [...state.discard, state.hand.slice(action.payload, 1)]}),
    [voidCard]: (state, action) => ({...state, hand: state.hand.slice(action.payload, 1), voidPile: [...state.void, state.hand.slice(action.payload, 1)]}),
}, initialState);


// how we grab data from the store
const selectPlayer = createSelector(
    state => state.player,
    player => player   
)

export const usePlayer = () => useSelector(selectPlayer);

