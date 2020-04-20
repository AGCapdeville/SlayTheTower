import { createAction, handleActions, createActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const addHealth = createAction('health/ADD_HEALTH');
export const removeHealth = createAction('health/REMOVE_HEALTH');

export const clearHealth = createAction('health/CLEAR_HEALTH');
export const setHealth = createAction('health/SET_HEALTH');

const initialHealthState = 100;
const initialEnergyState = 3;
const initialDeck = "sword"


export default handleActions({
    [addHealth]: (state, action) => state + action,
    [removeHealth]: (state, action) => state - action,
}, initialHealthState);


// how we grab data from the store
const selectHealth = createSelector(
    state => state.health,
    health => health   
)

export const useHealth = () => useSelector(selectHealth);

