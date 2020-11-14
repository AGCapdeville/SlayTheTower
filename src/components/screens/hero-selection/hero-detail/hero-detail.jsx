import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "../hero-selection.module.scss";


const HeroDetail = () => {

    return (
    <div className={styles.gameScreen}>
        <div className={styles.title} >CHOOSE YOUR HERO</div>

        <div className={styles.menuContainer}>

            <div className={styles.heroContainer}>
                <div className={styles.heroTitle}> sword </div>
                <div className={styles.heroImg}></div>
            </div>

        </div>
    </div>
    );
    
}


export default HeroDetail;

