import React from 'react';
import styles from './eye.module.scss'


const Eye = () => {

    return(
      <div className={styles.bossContainer}> 
        <div className={styles.eyeBody}>
          <div className={styles.ring}></div>
        </div>
          <div className={styles.eye}>
                 <div className={styles.eyeM}></div>   
          </div>   
      </div>
    )
}


export default Eye;