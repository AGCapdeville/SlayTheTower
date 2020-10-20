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
export const spawnFloorBoss = createAction('foe/SPAWN_FLOOR_BOSS');
const initialState = { };

// name: 'Slime',
// art: 'https://i.imgur.com/Sun4iBT.png?1',
// health: 10,
// totalHealth: 10,
// defense: 0,
// telegraphing: ['damage 5'],
// moves: {
//     'whip':{
//         priority: 0,
//         target: ['hero'],
//         effect: ['damage'],
//         power: [5]
//     },
//     'spit':{
//         priority: 1,
//         target: ['hero'],
//         effect: ['damage'],
//         power: [8]
//     },
//     'soften':{
//         priority: 1,
//         target: ['self'],
//         effect: ['defense'],
//         power: [12]
//     }
// }


export default handleActions({
    [spawnFoe]: (state) => ({ ...state, ...creeps[0] }),
    [spawnFloorBoss]: (state, action) => ({...state, ...action.payload}),
    [updateFoe]: (state, action) => {
        return ({ ...state, ...action.payload })
    },
}, initialState);


// how we grab data from the store
const selectFoe = createSelector(
    state => state.foe,
    foe => foe   
)

export const useFoe = () => useSelector(selectFoe);

