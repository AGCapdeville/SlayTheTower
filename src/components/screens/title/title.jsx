import React, { useEffect } from 'react';
import titleStyle from "./title.module.scss";
import { updateScreen } from '../../../ducks/screen';
import { useDispatch } from 'react-redux';

import { updatePlayer } from '../../../ducks/player'
import { heros } from '../../../game-data/heros-data'

import { updateGameState } from '../../../ducks/game_state';
import { gameState } from '../../../game-data/game-state';

// full screen......
import { FullScreen, useFullScreenHandle } from "react-full-screen";


const TitleScreen = () => {

    const dispatch = useDispatch();
  
    // TODO: Move to New Game Screen
    dispatch(updatePlayer(heros[0]))
    dispatch(updateGameState(gameState))

    // full screen....
    const handle = useFullScreenHandle();

    
    return (
            <div className={titleStyle.game} >

                <div className={titleStyle.game} >
                    <div className={titleStyle.title} >SLAY THE TOWER</div>
                    <div className={titleStyle.menu} onClick={() => 
                            {
                                dispatch(updateGameState({screen:'HeroSelection'}));
                                dispatch(updateScreen('HeroSelection'));
                            }
                        }> NEW GAME </div>
                    <div className={titleStyle.menu} onClick={() => 
                            {
                                dispatch(updateGameState({screen:'Map'}))
                                dispatch(updateScreen('Map'))
                            }
                        }> MAP </div>
                </div>

            </div>
    );
}

export default TitleScreen