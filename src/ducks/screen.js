import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { act } from "react-dom/test-utils";

import {transition_style} from '../components/transition/transition.module.scss'


export const updateScreen = createAction('screen/UPDATE_SCREEN');

const initialSreenState = 'Title';


export default handleActions({
    [updateScreen]: (state, action) => {
        transition_animation(action.payload)
        return(state=action.payload)
    },
}, initialSreenState);

const selectScreen = createSelector(
    state => state.screen,
    screen => screen   
)

export const useScreen = () => useSelector(selectScreen);


export const transition_animation = (toScreen) => {

    let overlayT = document.getElementById("overlayT");

    let transitionTime = 1000;

    if (toScreen === 'Combat'){
        transitionTime = 600;
    }
    if (toScreen === 'Resolution'){
        transitionTime = 300;
    }

    overlayT.animate([
        {opacity: 1, backgroundColor: 'white', zIndex: 100},
        {opacity: 1, backgroundColor: 'black', zIndex: 100},
        {opacity: 0, zIndex: 100 }
    ], {
        duration: transitionTime,
        iterations: 1
    });
}
