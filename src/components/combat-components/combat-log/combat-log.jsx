import React, { useEffect } from 'react';
import styles from './combat-log.module.scss'
import { useDispatch } from 'react-redux'
import { useCombat } from '../../../ducks/combat';


const CombatLog = () => {

    const combat = useCombat();

    console.log('combat:', combat)

    return(
        <div id='combatMsgs' className={styles.combatLog}>
            <div className={styles.combatLogHeader}>
                Combat Log
            </div>
            <div className={styles.scrollableLog}>
                {combat.combatLog.map( (log, index) => 
                    <div key={index}> 
                        {
                            log.origin === 'player' ? 
                                <>
                                    <div className={styles.heroLog}>
                                        {log.description}
                                    </div>
                                </>
                                :
                                <>
                                    <div className={styles.monsterLog}>
                                        {log.description}
                                    </div>
                                </>
                        }
                    </div>
                )}
            </div>

        </div>
    );
}


export default CombatLog;
