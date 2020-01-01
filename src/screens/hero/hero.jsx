import React from 'react'
import heroStyle from "./hero.module.scss"

const HeroScreen = ({ setCurrentScreen }) => {
    return (
    <div className={heroStyle.game}>
        <div onClick={() => setCurrentScreen('TitleScreen')}>
            WARRIOR
        </div>
    </div>
    );
}


export default HeroScreen;

