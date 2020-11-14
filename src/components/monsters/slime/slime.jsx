import React from 'react';
import styles from './slime.module.scss'


const Slime = () => {

    return(
        <div className={styles.monsterContainer}>
            <div className={styles.slime}>
                <div className={styles.rightEye}></div>
                <div className={styles.leftEye}></div>
            </div>
        </div>
    )
}


export default Slime;