import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "../hero-selection.module.scss";


const HeroDetail = () => {

    const dispatch = useDispatch();

    return (
    <div className={styles.gameScreen}>
        <div className={styles.title} >CHOOSE YOUR HERO</div>

        <div className={styles.menuContainer}>

            <div className={styles.heroContainer}>
                <div className={styles.heroTitle}> sword </div>
                <div className={styles.heroImg}></div>
                {/* <div style="background-image: url(https://i.imgur.com/CpkKARv.png); height: 400px; width: 400px;"> </div> */}
            </div>

        </div>
    </div>
    );
    
}


export default HeroDetail;

