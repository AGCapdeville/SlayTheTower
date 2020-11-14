import React from 'react';
import styles from './hero.module.scss';



const Hero = (props) => {
    
    if (props.heroType === 'mage'){
        return(
            <div id="mage" className={styles.heroContainer}>
                
                {/* live body */}
                <div id="mageBody" className={styles.heroBody}>
                    <div className={styles.headContainer}>
                        <div className={styles.hood}>
                        <div className={styles.headMageHero}></div>
                        </div>
                    </div>
                    <div className={styles.chest}></div>
                    <div className={styles.waist}></div>
                    <div id='staff' className={styles.staff}>
                        <div className={styles.heroHandRight}></div>
                        <div className={styles.heroHandLeft}></div>
                    </div>
                </div>

                {/* 'KO' body */}
                <div id="koMageBody" className={styles.koHeroBody}>
                    <div className={styles.headContainer}>
                        <div className={styles.koHood} >
                        <div id="koMageHead" className={styles.koHeadMageHero}></div>
                        </div>
                    </div>
                    <div className={styles.koChest}></div>
                    <div className={styles.waist}></div>
                    <div id='koStaff' className={styles.koStaff}>
                        <div className={styles.heroHandRight}></div>
                        <div className={styles.heroHandLeft}></div>
                    </div>
                </div>

            </div>
        )
    }else if (props.heroType === 'sword'){
        return(
            <div id='sword' className={styles.heroContainer}> 
                <div id="swordBody" className={styles.heroBody}>

                    <div className={styles.headContainer}>
                        <div className={styles.hood}>
                        <div className={styles.headSwordHero}></div>
                        </div>
                    </div>

                    <div className={styles.chest}></div>
                    <div className={styles.waist}></div>
                    
                    <div id='swordContainer' className={styles.swordContainer}>
                        <div id='swordHilt' className={styles.swordHilt}> 
                        <div id='gripedHands' className={styles.grippedHands}></div>
                        <div id='swordTip' className={styles.swordTip}> 
                            <div id='swordPattern' className={styles.swordPattern}> 
                            </div>
                        </div>
                        </div>
                    </div>
                
                </div>
            </div>
        )
    }else{
        return(
            <div id='shield' className={styles.heroContainer}> 
                <div id="shieldBody" className={styles.heroBody}>
            
                <div className={styles.headContainer}>
                    <div className={styles.hood}>
                    <div className={styles.headShieldHero}></div>
                    </div>
                </div>
            
                <div className={styles.chest}></div>
                <div className={styles.waist}></div>
                
                <div id='shield' className={styles.shield}> 
                </div>
                
                </div>
            </div>
        )
    }

}

export default Hero;
