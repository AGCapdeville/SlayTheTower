import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {track_list} from "../game-data/tracks"

export const setTrack = createAction('music/SET_TRACK');
export const load = createAction('music/LOAD');
export const loop = createAction('music/LOOP');
export const mute = createAction('music/MUTE');


const initialState = {
    curr_track : document.createElement('audio'),
    is_playing : false,
    is_looping : false,
    is_muted: false,
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

const reduceLoadTrack = ({ curr_track, track, is_looping, ...rest}) => {
    curr_track.src = track.path;
    curr_track.load();
    curr_track.autoplay = true; 
    curr_track.loop = is_looping;
    return { ...rest, curr_track: curr_track, track: track, is_looping: is_looping }
}



export default handleActions({
    [setTrack]: (state, action) => ({ ...state, track: action.payload}),
    [load]: reduceLoadTrack,
    [loop]: (state, action) => ({ ...state, is_looping: action.payload}),
    [mute]: reduceMuteTrack,
}, initialState);


const selectMusic = createSelector(
    state => state.music,
    music => music   
)

export const useMusic = () => useSelector(selectMusic);
