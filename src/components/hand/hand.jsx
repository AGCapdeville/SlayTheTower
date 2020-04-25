import React from 'react';
import styles from './hand.module.scss'
import { usePlayer } from '../../ducks/player';


const Card = () =>{

    const player = usePlayer();
    return(
        <div>
            {
                player.hand.map(card =>
                    <button className = {styles.customButton}>
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

    return (
        <div className = {styles.activeZone}>
            <div className = {styles.hand}>
                {/* {player.hand.map(card => <button> {card.name} </button>)} */}

                {/* <button onclick="myFunction()">Click me</button> */}

                <Card /> 

                {/* <button onclick={ dispatch(drawCard())}>
                </button> */}

            </div>
        </div>
    );
}


export default Hand;

