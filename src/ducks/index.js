import { combineReducers } from 'redux';
import player from './player';
import foe from './foe';
import screen from './screen';
import combat from './combat';
import climbState from './climbState';
import map from './map';
import shop from './shop';

export default combineReducers({
    player,
    foe,
    screen,
    combat,
    climbState,
    map,
    shop
})