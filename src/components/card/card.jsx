import React from 'react';
import styles from './card.module.scss'


const Card = (props) => {
    return(
        <div className = {styles.card}>

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

            <br/>
            {props.cardData.art}
            <br/> <br/>
            {props.cardData.description}
        </div>        
    )
}

export default Card;
