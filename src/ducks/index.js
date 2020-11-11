import { combineReducers } from 'redux';
import player from './player';
import monster from './monster';
import screen from './screen';
import combat from './combat';
import game_state from './game_state';
import map from './map';
import shop from './shop';
import music from './music';

export default combineReducers({
    player,
    monster,
    screen,
    combat,
    game_state,
    map,
    shop,
    music
})