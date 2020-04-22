import React from 'react'
import heroStyle from "./hero.module.scss"

const HeroScreen = ({ setCurrentScreen }) => {

    return (
    <div className={heroStyle.game}>

        <div className={heroStyle.title}>
            CHOOSE ...
        </div>

        <div className={heroStyle.row}>
            
            {/* SWORD HERO: NEED TO SET PLAYER TO SWORD */}
            <div className={heroStyle.menu}
            onClick={() => setCurrentScreen('Encounter') } >
                <div className={heroStyle.validOverlay} />
                <img
                    className={heroStyle.sword} src="https://i.imgur.com/CpkKARv.png" 
                    alt="sword"/>
            </div>

            
            <div className={heroStyle.menu}>
                <div className={heroStyle.invalidOverlay} />
                <img
                    onClick={() => setCurrentScreen('Title') }
                    className={heroStyle.staff}src="https://i.imgur.com/UtxwQCE.png" 
                    alt="staff"/>
            </div>

        </div>
    
    </div>
    );
}

export default HeroScreen;
