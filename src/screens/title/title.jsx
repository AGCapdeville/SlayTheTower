import React from 'react'
import titleStyle from "./title.module.scss";

import { useDispatch } from 'react-redux';
import { useHealth, addHealth, removeHealth, clearHealth, setHealth, restoreHealth} from '../../ducks/health'


const Title = ({ setCurrentScreen }) => {
    const dispatch = useDispatch();
    const health = useHealth();



    return (
        <div className={titleStyle.game} >
            <p>
                Health: {health}
            </p>

            <button onClick={ () => dispatch(addHealth()) }>ADD</button>
            <button onClick={ () => dispatch(removeHealth()) }>DMG</button>
            <button onClick={ () => dispatch(clearHealth()) }>KILL</button>
            <button onClick={ () => dispatch(restoreHealth()) }>PHOENIX POTION</button>
            <button onClick={ () => dispatch(setHealth(10)) }>HP POTION</button>


            <div className={titleStyle.title} >SLAY THE TOWER</div>
            <div className={titleStyle.menu} onClick={() => setCurrentScreen('Hero')}> START </div>
            <div className={titleStyle.menu} onClick={() => setCurrentScreen('Settings')}> SETTINGS </div>
    
        </div>
    );
}

export default Title