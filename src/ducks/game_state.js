import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const updateGameState = createAction('game_state/UPDATE_GAME_STATE');

const initialState = {
    screen: 'title',
    defeat: false,
    floor: 0,
    playerScore: 0,
}

export default handleActions({
    [updateGameState]: (state, action) => ({ ...state, ...action.payload }),
}, initialState);


const selectGameState = createSelector(
    state => state.game_state,
    game_state => game_state   
)

export const useGameState = () => useSelector(selectGameState);


