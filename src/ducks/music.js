import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {track_list} from "../game-data/tracks"

export const setTrack = createAction('music/SET_TRACK');
export const load = createAction('music/LOAD');
export const loop = createAction('music/LOOP');
export const mute = createAction('music/MUTE');
export const updateVolume = createAction('music/UPDATE_VOLUME');


const initialState = {
    curr_track : document.createElement('audio'),
    is_playing : false,
    is_looping : false,
    is_muted: true,
    curr_volume: parseFloat(0.5),
}

const reduceMuteTrack = ({ curr_track, is_muted, ...rest}) => {
    if (is_muted){
        curr_track.muted = false
        return { ...rest, is_muted: false, curr_track: curr_track}
    }else{
        curr_track.muted = true
        return { ...rest, is_muted: true, curr_track: curr_track}
    }
}

const reduceLoadTrack = ({ curr_track, track, is_looping, curr_volume, ...rest}) => {
    curr_track.src = track.path;
    curr_track.load();
    curr_track.autoplay = true; 
    curr_track.loop = is_looping;
    curr_track.volume = curr_volume;
    return { ...rest, curr_track: curr_track, track: track, is_looping: is_looping, curr_volume: curr_volume }
}

const reduceUpdateVoulme = (state, volume) => {
    state.curr_volume = parseFloat(volume);
    state.curr_track.volume = parseFloat(volume);
}

export default handleActions({
    [setTrack]: (state, action) => ({ ...state, track: action.payload}),
    [load]: reduceLoadTrack,
    [loop]: (state, action) => ({ ...state, is_looping: action.payload}),
    [mute]: reduceMuteTrack,
    [updateVolume]: (state, action) => {
        reduceUpdateVoulme( state, action.payload )
        return({ ...state, curr_volume: parseFloat(action.payload)})
    }
}, initialState);


const selectMusic = createSelector(
    state => state.music,
    music => music   
)

export const useMusic = () => useSelector(selectMusic);
