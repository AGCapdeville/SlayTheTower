import { combineReducers } from 'redux';
import player from './player'
import foe from './foe'
import screen from './screen'
import encounter from './encounter'
import climbState from './climbState'

export default combineReducers({
    player,
    foe,
    screen,
    encounter,
    climbState,
})