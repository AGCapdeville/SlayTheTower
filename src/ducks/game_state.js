import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {cards} from "../game-data/card-data"

export const updateGameState = createAction('game_state/UPDATE_GAME_STATE');
export const resolutionCards = createAction('game_state/RESOLUTION_CARDS');

const initialState = {
    screen: 'title',
    defeat: false,
    floor: 0,
    playerScore: 0,
    resolutionCards: [],
    floorComplete: false
}

function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const reduceResolutionCards = ({ resolutionCards, ...rest}) => {
    let newResolutionCards = [...resolutionCards, cards[getRandomRange(3,cards.length)], cards[getRandomRange(3,cards.length)] ]
    return { ...rest, resolutionCards: newResolutionCards}
}


export default handleActions({
    [updateGameState]: (state, action) => ({ ...state, ...action.payload }),
    [resolutionCards]: reduceResolutionCards,
}, initialState);


const selectGameState = createSelector(
    state => state.game_state,
    game_state => game_state   
)

export const useGameState = () => useSelector(selectGameState);


