import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './hand.module.scss'
import { usePlayer, applyCard } from '../../../ducks/player';

import Card from '../../card';

const Cards = () =>{

    const player = usePlayer();
    const dispatch = useDispatch();
    const onCardClick = (index) =>  dispatch(applyCard(index));

    return(
        <div>
            {
                player.hand.map( (cardData, index) =>
                    <button key={index} onClick={ () => onCardClick(index) } className={styles.customButton}>
                        <Card cardData={cardData} combat={true}/>
                    </button>                
                )}
        </div>
    );
}

const Hand = () => {
    const dispatch = useDispatch()

    return (
        <div className = {styles.activeZone}>
            <div className = {styles.hand}>
                <Cards /> 
            </div>
        </div>
    );
}


export default Hand;

