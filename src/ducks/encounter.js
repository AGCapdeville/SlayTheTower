import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// export const setupEncounter = createAction('foe/SETUP_ENCOUNTER');
export const updateEncounter = createAction('foe/UPDATE_ENCOUNTER');

const initialState = {};


export default handleActions({
    [updateEncounter]: (state, action) => ({ ...state.encounter, ...action.payload }),
}, initialState);


// how we grab data from the store
const selectEncounter = createSelector(
    state => state.encounter,
    encounter => encounter   
)

export const useEncounter = () => useSelector(selectEncounter);

