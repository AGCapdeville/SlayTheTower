import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const updateMap = createAction('map/UPDATE_MAP');


// maybe add some trackers for trials, bonfires, elites & shops. To somehow limit or increase it?

const initialState = {
    fieldEvent: "event name",
    fieldPaths: 0,
    fieldPathEvents: [],
    count: 0
}


export default handleActions({
    [updateMap]: (state, action) => ({ ...state, ...action.payload }),
}, initialState);


const selectMap = createSelector(
    state => state.map,
    map => map   
)

export const useMap = () => useSelector(selectMap);
