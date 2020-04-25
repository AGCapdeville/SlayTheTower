import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { creeps } from '../game-data/creep-data';

// export const setFoeName = createAction('foe/SET_FOE_NAME');
// export const setFoeImg = createAction('foe/SET_FOE_IMG');
// export const setFoeTotalHealth = createAction('foe/SET_FOE_TOTAL_HEALTH');
// export const setFoeMoves = createAction('foe/SET_FOE_MOVES');
export const spawnFoe = createAction('foe/SPAWN_FOE');
export const updateFoe = createAction('foe/UPDATE_FOE');


const initialState = {};

export default handleActions({
    [spawnFoe]: (state) => ({ ...state, ...creeps[0] }),
    [updateFoe]: (state, action) => ({ ...state.foe, ...action.payload }),
}, initialState);


// how we grab data from the store
const selectFoe = createSelector(
    state => state.foe,
    foe => foe   
)

export const useFoe = () => useSelector(selectFoe);

