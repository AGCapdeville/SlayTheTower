import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './hand.module.scss'

// import Encounter from '../../game-mechanics/encounter';
import { usePlayer, drawHand, shuffleDeck } from '../../ducks/player';
import { findAllInRenderedTree } from 'react-dom/test-utils';


const Card = () =>{
    const player = usePlayer();
    const dispatch = useDispatch();
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

    const player = usePlayer();
    const dispatch = useDispatch();

    return (
        <div className = {styles.activeZone}>
            <div className = {styles.hand}>
                {/* {player.hand.map(card => <button> {card.name} </button>)} */}
                <Card /> 
            </div>
        </div>
    );
}


export default Hand;

