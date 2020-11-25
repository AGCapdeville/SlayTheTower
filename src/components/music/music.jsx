import React, { useEffect } from 'react';
import { useMusic, load, loop, mute, setTrack, updateVolume} from '../../ducks/music';
import { track_list } from '../../game-data/tracks';
import { useDispatch } from 'react-redux'
import {useScreen} from '../../ducks/screen';


const playButton = (dispatch, screen) => {    
    const screenTrack = track_list.find(track => track.for === String(screen));
    dispatch(setTrack(screenTrack));

    dispatch(mute());

    if(screen !== 'Resolution'){
        dispatch(loop(true));
    }else{
        dispatch(loop(false));
    }
    dispatch(load());

    let playButton = document.getElementById('musicPlayButton');
    playButton.style.opacity = '0';
    playButton.style.position = 'absolute';
    playButton.style.zIndex = '-1';
    playButton.disabled = 'disabled';

    let muteToggleButton = document.getElementById('musicToggle');
    muteToggleButton.style.opacity = '1';
}

const muteToggleButton = (dispatch, is_muted, screen) => {
    let musicToggle = document.getElementById('musicToggle');
    dispatch(mute());

    if (is_muted){
        document.getElementById("musicToggle").innerHTML = "Sound: ON";
        musicToggle.style.opacity = 1;
        
        const screenTrack = track_list.find(track => track.for === String(screen));
        
        if (screen !== 'Resolution'){
            dispatch(loop(true));
        }else{
            dispatch(loop(false));
        }

        dispatch(setTrack(screenTrack));
        dispatch(load());

    }else{
        document.getElementById("musicToggle").innerHTML = "Sound: OFF";
        musicToggle.style.opacity = .5;

    }
    
}

const Music = () => {

    const music = useMusic();
    const dispatch = useDispatch();
    const screen = useScreen();

    useEffect(() => {
        if (!music.is_muted){
            const screenTrack = track_list.find(track => track.for === String(screen));
            if(screen !== 'Resolution'){
                dispatch(loop(true));
            }else{
                dispatch(loop(false));
            }
            dispatch(setTrack(screenTrack));
            dispatch(load());
        }
    },[screen])

    return(
        <>
            <div>
                <button id="musicPlayButton" onClick={ () => playButton(dispatch, screen) }>
                    Allow Music
                </button>
                <button id="musicToggle" style={{opacity:'0', zIndex:'-1'}} onClick={ () => muteToggleButton(dispatch, music.is_muted, screen) }> 
                    Sound: ON
                </button>
                <br/> 
                <input id="volume" type="range" min="10" max="100" onChange={ (e) => dispatch(updateVolume(e.target.value/100)) }/>
                <audio id='audio'> </audio>
            </div>
        </>
    )
    
    
}

export default Music;

