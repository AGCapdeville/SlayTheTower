import { combineReducers } from 'redux';
import player from "./player"
import foe from "./foe"
import screen from "./screen"

export default combineReducers({
    player,
    foe,
    screen
})