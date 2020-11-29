import React from 'react';
import styles from './stone.module.scss'


const Stone = () => {

    return(
        <div className={styles.monsterContainer}>
            <div className={styles.stone}>
                <div className={styles.stoneEye}></div>
            </div>
        </div>
    )
}


export default Stone;