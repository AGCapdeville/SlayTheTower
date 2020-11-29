import React from 'react';
import styles from './enforcer.module.scss'


const Enforcer = () => {

    return(
        <div className={styles.monsterContainer}>
            <div className={styles.enforcer}>
            <div className={styles.lHorn}></div>
            <div className={styles.socket}>
                <div className={styles.transEye}></div>
            </div>
            </div>
        </div>
    )
}


export default Enforcer;