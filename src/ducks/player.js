import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { act } from "react-dom/test-utils";

// Alter Health, Energy & Armor Actions:
export const setHealth = createAction('player/SET_HEALTH');
export const alterHealth = createAction('player/ALTER_HEALTH');
export const setEnergy = createAction('player/SET_ENERGY');
export const alterEnergy = createAction('player/ALTER_ENERGY');
export const alterArmor = createAction('player/ALTER_ARMOR');
// export const newRound = createAction('player/NEW_ROUND');

// Deck Actions:
export const setDeck = createAction('player/SET_DECK');
export const drawCard = createAction('player/DRAW_CARD');
export const useCard = createAction('player/USE_CARD');
export const voidCard = createAction('player/VOID_CARD');


const initialState = {
    health: 55,
    energy: 3,
    armor: 0,
    deck: [],
    hand: [],
    discard: [],
    voidPile: []
}


export default handleActions({
    // player Health, Energy & Armor actions:
    [setHealth]: (state, action) => ({...state, health: action.payload}),
    [alterHealth]: (state, action) => ({...state, health: state.health + action.payload}),
    [setEnergy]: (state, action) => ({...state, energy: action.payload}),
    [alterEnergy]: (state, action) => ({...state, energy: state.energy + action.payload}),
    [alterArmor]: (state, action) => ({...state, armor: state.energy + action.payload}),
    // might need to see if I can set initialStates later ???????
    // [newRound]: (state) => ({...state, energy: initialState.energy, armor: initialState.armor}),
    // deck handle:
    [setDeck]: (state, action) => ({...state, deck: action.payload }),
    // [drawCard]: (state) => ({...state, deck: state.deck.slice( 0, state.deck.length - 1), hand: [...hand, state.deck.slice(-1, 1)]}),
    // [useCard]: (state, action) =>({...state, hand: state.hand.slice(action.payload, 1), discard: [...discard, state.hand.slice(action.payload, 1)]}),
    // [voidCard]: (state, action) => ({...state, hand: state.hand.slice(action.payload, 1), voidPile: [...voidPile, state.hand.slice(action.payload, 1)]}),
}, initialState);


// how we grab data from the store
const selectPlayer = createSelector(
    state => state.player,
    player => player   
)

export const usePlayer = () => useSelector(selectPlayer);

