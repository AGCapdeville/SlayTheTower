import React from 'react';
import styles from './card.module.scss'


const Card = (props) => {
    return(
        <div>

            <div className = {styles.cardFace}>
                <div className = {styles.titleSection}>
                    <div className = {styles.title}> 
                        {props.cardData.name} 
                    </div> 

                    {!props.combat && 
                        <div>
                            G: {props.cardData.cost}
                        </div> 
                    }
                </div>
                
                <div className={styles.cardArt}>
                    {props.cardData.art}
                </div>

                <div className={styles.cardDescription}>
                    {props.cardData.description}
                </div>

                <div className = {styles.costRow}>
                    <div className = {styles.energy}>
                        {props.cardData.energy}
                    </div>

                    <div className = {styles.requiredHero}>
                        {props.cardData.requiredHero}
                    </div>
                </div>
                
            </div>

        </div>        
    )
}

export default Card;
