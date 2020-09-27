import React from 'react';
import titleStyle from "./title.module.scss";
import { updateScreen } from '../../../ducks/screen';
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
            <div className={titleStyle.menu} onClick={() => dispatch(updateScreen('HeroSelection'))}> NEW GAME </div>
            <div className={titleStyle.menu} onClick={() => dispatch(updateScreen('Map'))}> MAP </div>
        </div>
    );
}

export default TitleScreen