import { combineReducers } from 'redux';
import health from "./health"
import screen from "./screen"

export default combineReducers({
    health,
    screen
})