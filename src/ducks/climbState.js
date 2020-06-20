import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const updateClimbState = createAction('climbState/UPDATE_CLIMB_STATE');

const initialState = {
    defeat: false,
    floor: 0,
    playerScore: 0,
}

export default handleActions({
    [updateClimbState]: (state, action) => ({ ...state, ...action.payload }),
}, initialState);


const selectClimbState = createSelector(
    state => state.climbState,
    climbState => climbState   
)

export const useClimbState = () => useSelector(selectClimbState);


