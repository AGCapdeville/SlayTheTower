import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { monsters } from '../game-data/monster-data';

// export const setFoeName = createAction('foe/SET_FOE_NAME');
// export const setFoeImg = createAction('foe/SET_FOE_IMG');
// export const setFoeTotalHealth = createAction('foe/SET_FOE_TOTAL_HEALTH');
// export const setFoeMoves = createAction('foe/SET_FOE_MOVES');
export const spawnMonster = createAction('monster/SPAWN_MONSTER');
export const updateMonster = createAction('monster/UPDATE_MONSTER');
export const spawnFloorBoss = createAction('monster/SPAWN_FLOOR_BOSS');


const initialState = { };


export default handleActions({
    [spawnMonster]: (state, action) => ({
        ...state, 
        ...monsters.find( m => action.payload === m.name),
    }),
    [spawnFloorBoss]: (state, action) => ({...state, ...action.payload}),
    [updateMonster]: (state, action) => {
        return ({ ...state, ...action.payload })
    },
}, initialState);
 

// how we grab data from the store
const selectMonster = createSelector(
    state => state.monster,
    monster => monster   
)

export const useMonster = () => useSelector(selectMonster);

