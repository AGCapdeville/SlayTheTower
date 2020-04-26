import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './hand.module.scss'
import { usePlayer, playIndexedCard } from '../../ducks/player';



const Card = () =>{

    const player = usePlayer();
    const dispatch = useDispatch();
    return(
        <div>
            {
                player.hand.map( (card, index) =>
                    <button onClick={ () => dispatch( playIndexedCard(index) ) } className = {styles.customButton}>
                        <div className = {styles.card}>

                            <div className = {styles.titleSection}>

                                <div className = {styles.title}> 
                                    {card.name} 
                                </div> 

                                <div className = {styles.energy}>
                                    {card.energy}
                                </div>

                            </div>

                            <br/>
                            {card.art}
                            <br/> <br/>
                            {card.description}
                        </div>
                    </button>                
                )}
        </div>
    );
}

const Hand = () => {

    // useEffect(() => { 
    //     // var card = document.createElement("div");
    //     // var node = document.createTextNode("This is new.");
    //     // card.appendChild(node);
        
    //     // var element = document.getElementById("hand");
    //     // var child = document.getElementById("c");
    //     // element.insertBefore(card, child);
    // }, []);

    const dispatch = useDispatch()

    return (
        <div className = {styles.activeZone}>
            <div className = {styles.hand}>
                <Card /> 
            </div>
        </div>
    );
}


export default Hand;

