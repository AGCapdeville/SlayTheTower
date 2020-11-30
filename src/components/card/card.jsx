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
                        <div className={styles.cost}>
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
                        ⚡ {props.cardData.energy}
                    </div>

                    <div className = {styles.requiredHero}>
                        {requiredHeroIcon(props.cardData.requiredHero)}
                    </div>
                </div>
            </div>
        </div>        
    )
}


/* requiredHero :
// a - any hero standing: white dot
// o - off needed: red dot
// u - util needed: blue dot
// d - def needed: green dot
// do - def & off needed: green & blue dot
// ud - util & def needed: blue & etc...
// ou - off & util needed: ...
// e - every hero needed: red, blue & green
*/

function requiredHeroIcon(reqHeros){
    switch (reqHeros) {
        case 'a':
            return( <div className={styles.whiteDot}/> )
        case 'o':
            return( <div className={styles.redDot}/> )
        case 'u':
            return( <div className={styles.blueDot}/> )
        case 'd':
            return( <div className={styles.greenDot}/> )
        case 'do':
            return( 
                <> 
                    <div className={styles.greenDot}/>
                    <div className={styles.rednDot}/>
                </>
            )
        case 'du':
            return(
                <> 
                    <div className={styles.greenDot}/>
                    <div className={styles.blueDot}/> 
                </>
            )
        case 'ou':
            return( 
                <> 
                    <div className={styles.redDot}/>
                    <div className={styles.blueDot}/>
                </>
            )
        case 'e':
            return( <div className={styles.blackDot}/> )
        default:
            return( <div className={styles.whiteDot}/> )
    }
}

export default Card;
