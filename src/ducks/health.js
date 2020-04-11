import { createAction, handleActions, createActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const addHealth = createAction('health/ADD_HEALTH');
export const removeHealth = createAction('health/REMOVE_HEALTH');
export const restoreHealth = createAction('health/RESTORE_HEALTH')
export const clearHealth = createAction('health/CLEAR_HEALTH');
export const setHealth = createAction('health/SET_HEALTH');

const initialState = 10;

export default handleActions({
    [addHealth]: (state) => state + 1,
    [removeHealth]: (state) => state - 1,
    [restoreHealth]: (state) => initialState,
    [clearHealth]: (state) => 0,
    [setHealth]: (state, action) => state + action.payload,
}, initialState);

// how we grab data from the store
const selectHealth = createSelector(
    state => state.health,
    health => health   
)

export const useHealth = () => useSelector(selectHealth);

