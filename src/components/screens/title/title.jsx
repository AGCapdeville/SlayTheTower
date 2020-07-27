import React from 'react';
import titleStyle from "./title.module.scss";
import { setScreen } from '../../../ducks/screen';
import { useDispatch } from 'react-redux';

import { updatePlayer } from '../../../ducks/player'
import { heros } from '../../../game-data/heros-data'

import { updateClimbState } from '../../../ducks/climbState';
import { gameState } from '../../../game-data/game-state';

const TitleScreen = () => {

    const dispatch = useDispatch();

    // TODO: MOVE TO HERO WEAPON SELECTION SCREEN
    dispatch(updatePlayer(heros[0]))
    dispatch(updateClimbState(gameState))
    
    return (
        <div className={titleStyle.game} >
            <div className={titleStyle.title} >SLAY THE TOWER</div>
            <div className={titleStyle.menu} onClick={() => dispatch(setScreen('Encounter'))}> TEST ENCOUNTER</div>
            <div className={titleStyle.menu} onClick={() => dispatch(setScreen('HeroSelection'))}> NEW GAME </div>
            <div className={titleStyle.menu} onClick={() => dispatch(setScreen('Map'))}> TEST MAP </div>
        </div>
    );
}

export default TitleScreen