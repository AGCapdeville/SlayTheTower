import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./hero-selection.module.scss";


import { gameState } from '../../../game-data/game-state';
import { updateClimbState } from '../../../ducks/climbState';
import { updatePlayer } from '../../../ducks/player'
import { heros } from '../../../game-data/heros-data'
import { setScreen } from '../../../ducks/screen';

// import { HeroDetail } from './hero-detail';


// in this screen player chooses hero weapon / deck

const HeroSelection = () => {

    const dispatch = useDispatch();

    const onCardClick = (heroType) => {
        console.log(heroType)
        dispatch(updatePlayer(heros[0]))
        dispatch(updateClimbState(gameState))
        dispatch(setScreen('Encounter'))
        // will be changed to map screen.
    }

    return (
        <div className={styles.gameScreen}>
            <div className={styles.title} >CHOOSE YOUR HERO</div>

            <div className={styles.menuContainer}>

                <div onClick={ () => onCardClick('sword') } className={styles.heroContainer}>
                    <div className={styles.heroTitle}> sword </div>
                    <div className={styles.heroImg}></div>
                </div>

                {/* <div onClick={() => choice('staff')} className={styles.heroContainer}>
                    <div className={styles.heroTitle}> staff </div>
                    <div className={styles.heroImg}></div>
                </div> */}
            </div>
        </div>
    );
}


export default HeroSelection;

