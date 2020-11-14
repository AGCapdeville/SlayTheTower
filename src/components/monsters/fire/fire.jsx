import React from 'react';
import styles from './fire.module.scss'


const Fire = () => {

    return(
        <div className={styles.monsterContainer}>
            
            <div className={styles.spike}>
                <div className={styles.spikeL}>
                    <div className={styles.spikeL}></div>
                </div>
                <div className={styles.spikeR}>
                    <div className={styles.spikeR}></div>
                </div>
                <div className={styles.triEye}></div>
            </div>

        </div>
    )
}


export default Fire;