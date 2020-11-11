import React from 'react';
import styles from './hero.module.scss';



const Hero = (props) => {
    
    if (props.heroType === 'mage'){
        return(
            <div id="mage" className={styles.heroContainer}> 
                <div className={styles.heroBody}>
                
                <div className={styles.headContainer}>
                    <div className={styles.hood}>
                    <div className={styles.headMageHero}></div>
                    </div>
                </div>
                
                <div id='chest' className={styles.chest}></div>
                <div id='waist' className={styles.waist}></div>
                <div id='staff' className={styles.staff}>
                    <div id='right' className={styles.heroHandRight}></div>
                    <div id='left' className={styles.heroHandLeft}></div>
                </div>
                
                </div>
            </div>
        )
    }else if (props.heroType === 'sword'){
        return(
            <div id='sword' className={styles.heroContainer}> 
                <div className={styles.heroBody}>

                    <div className={styles.headContainer}>
                        <div className={styles.hood}>
                        <div className={styles.headSwordHero}></div>
                        </div>
                    </div>

                    <div id='chest' className={styles.chest}></div>
                    <div id='waist' className={styles.waist}></div>
                    
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
                <div className={styles.heroBody}>
            
                <div className={styles.headContainer}>
                    <div className={styles.hood}>
                    <div className={styles.headShieldHero}></div>
                    </div>
                </div>
            
                <div id='chest' className={styles.chest}></div>
                <div id='waist' className={styles.waist}></div>
                
                <div id='shield' className={styles.shield}> 
                </div>
                
                </div>
            </div>
        )
    }

}

export default Hero;
