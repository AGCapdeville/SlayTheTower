import React from 'react';
import styles from './card.module.scss'


const Card = (props) => {
    return(
        <div className = {styles.card}>

            <div className = {styles.cardFace}>
                <div className = {styles.titleSection}>
                    <div className = {styles.title}> 
                        {props.cardData.name} 
                    </div> 

                    <div className = {styles.energy}>
                        {props.cardData.energy}
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
            </div>

        </div>        
    )
}

export default Card;
