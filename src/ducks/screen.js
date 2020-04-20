import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";


export const setScreen = createAction('screen/SET_SCREEN');

const initialSreenState = 'Title';

export default handleActions({
    [setScreen]: (state, action) => state = action.payload,
}, initialSreenState);

const selectScreen = createSelector(
    state => state.screen,
    screen => screen   
)

export const useScreen = () => useSelector(selectScreen);

