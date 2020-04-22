import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { act } from "react-dom/test-utils";

export const setFoeName = createAction('foe/SET_FOE_NAME');
export const setFoeImg = createAction('foe/SET_FOE_IMG');
export const setFoeTotalHealth = createAction('foe/SET_FOE_TOTAL_HEALTH');
export const alterFoeHealth = createAction('foe/ALTER_FOE_HEALTH');
export const alterFoeArmor = createAction('foe/ALTER_FOE_ARMOR');
export const setFoeMoves = createAction('foe/SET_FOE_MOVES');


const initialState = {
    name: "",
    img: "",
    health: 0,
    totalHealth: 0,
    armor: 0,
    offensive: [],
    telegraph: []
}

export default handleActions({
    [setFoeName]: (state, action) => ({...state, name: action.payload}),
    [setFoeImg]: (state, action) => ({...state, img: action.payload}),
    [setFoeTotalHealth]: (state, action) => ({...state, totalHealth: action.payload,}),
    [setFoeMoves]: (state, action) => ({...state, moves: action.payload}),
    [alterFoeHealth]: (state, action) => ({...state, health: state.health + action.payload}),
    [alterFoeArmor]: (state, action) => ({...state, armor: state.energy + action.payload}),
}, initialState);


// how we grab data from the store
const selectFoe = createSelector(
    state => state.foe,
    foe => foe   
)

export const useFoe = () => useSelector(selectFoe);

