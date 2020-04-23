import React from 'react'
import titleStyle from "./title.module.scss";

import { useDispatch } from 'react-redux';
// import { setDeck, alterHealth, alterEnergy} from '../../ducks/health'


// pass the screen call back function to this dumb method
const Title = ({ setCurrentScreen }) => {
    
    const dispatch = useDispatch();
    const health = useHealth();


    return (
        <div className={titleStyle.game} >
            
            {/* TODO: Push the logic handaling screens into a duck */}
            <div className={titleStyle.title} >SLAY THE TOWER</div>
            <div className={titleStyle.menu} onClick={() => setCurrentScreen('Encounter')}> START ENCOUNTER</div>
    
            <div>
                Health: {health}
            </div>

            {/* <div>
                <button onClick={ () => dispatch(addHealth()) }>ADD</button>
                <button onClick={ () => dispatch(removeHealth()) }>DMG</button>
                <button onClick={ () => dispatch(clearHealth()) }>KILL</button>
                <button onClick={ () => dispatch(restoreHealth()) }>PHOENIX POTION</button>
                <button onClick={ () => dispatch(setHealth(10)) }>HP POTION</button>
            </div> */}

        </div>
    );
}

export default Title