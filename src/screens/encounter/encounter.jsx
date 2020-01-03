import React from 'react'
import encounterStyle from "./encounter.module.scss"

// var leftFoeHeight = 20;
// var leftFoeWidth = 10;

// var middleFoeHeight = 20;
// var middleFoeWidth = 10;

// var rightFoeHeight = 20;
// var rightFoeWidth = 10;

// pull from monster list, if small/medium/large monster, render apropriatly 

const HeroScreen = ({ setCurrentScreen }) => {

    return (
    <div className={encounterStyle.game}>
        
        <div className={encounterStyle.foeZone}>
            
            <div className = {encounterStyle.playerHealthBorder}> 
                <div className = {encounterStyle.playerHealthBar}>
                    55/55
                </div> 
            </div>

            
            {/* Shield : https://i.imgur.com/OtrV2sJ.png */}


            <div className = {encounterStyle.foes}> 
                

                <div className = {encounterStyle.foe}>
                    <div className = {encounterStyle.foeImg}> 
                        slime
                        <img src="https://i.imgur.com/Sun4iBT.png?1" 
                        alt="slime"/>
                    </div>
                    <div className = {encounterStyle.foeHealthBorder}>
                        <div className = {encounterStyle.foeHealthBar}>
                        12/12
                        </div>
                    </div>
                </div>  
            
            </div>
        </div>        

        <div className={encounterStyle.playerZone}> 
            <div className = {encounterStyle.drawZone}>
                <div className = {encounterStyle.energy}> 3 </div>
                <div className = {encounterStyle.deck}> 5 </div>
            </div>

            <div className = {encounterStyle.activeZone}>
                <div className = {encounterStyle.hand}>
                    CARDS HERE
                </div>
            </div>

            <div className = {encounterStyle.discardZone}>
                <div className = {encounterStyle.void}> 0 </div>
                <div className = {encounterStyle.discard}> 0 </div>
            </div>
        </div>
    </div>
    );
}


export default HeroScreen;

