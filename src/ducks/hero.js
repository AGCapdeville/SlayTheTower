import { createAction, handleActions, createActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Health Actions:
export const addHealth = createAction('hero/ADD_HEALTH');
export const removeHealth = createAction('hero/REMOVE_HEALTH');
export const setHealth = createAction('hero/SET_HEALTH');

// Deck Actions:
export const setDeck = createAction('hero/SET_DECK');
export const drawCard = createAction('hero/DRAW_CARD');
export const usedCard = createAction('hero/USE_CARD');


const initialState = {
    health: 100,
    energy: 3,
    deck: [],
    hand: [],
    graveyard: [],
    void: []
}



export default handleActions({
    // hero health:
    [addHealth]: (state, action) => ({...state, health: state.health + action.payload }),
    [removeHealth]: (state, action) => ({...state, health: state.health - action.payload }),
    // deck handle:
    [setDeck]: (state, action) => ({...state, deck: action }),
    [usedCard]: (state, action) =>({...state, hand: state.hand.remove[action], graveyard: [...graveyard, state.hand[action]] }),
    [drawCard]: (state) => ({...state, deck: state.deck.slice( 0, state.deck.length - 1), hand: [...hand, state.deck.slice(-1, 1)] }),
}, initialState);


// how we grab data from the store
const selectHealth = createSelector(
    state => state.health,
    health => health   
)

export const useHealth = () => useSelector(selectHealth);

