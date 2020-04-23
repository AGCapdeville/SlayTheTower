import { combineReducers } from 'redux';
import player from './player'
import foe from './foe'
import screen from './screen'
import encounter from './encounter'

export default combineReducers({
    player,
    foe,
    screen,
    encounter,
})