import React from 'react'
import titleStyle from "./title.module.scss";
import { setScreen, useScreen } from '../../ducks/screen'

import { useDispatch } from 'react-redux';
// import { useHealth, addHealth, removeHealth, clearHealth, setHealth, restoreHealth} from '../../ducks/health'

// const dispatch = useDispatch();


// pass the screen call back function to this dumb method
const Title = () => {
    // const health = useHealth();
    return (
        <div className={titleStyle.game} >
            
            {/* TODO: Push the logic handaling screens into a duck */}
            <div className={titleStyle.title} >SLAY THE TOWER</div>
            <div className={titleStyle.menu} onClick={() => setScreen('Encounter')}> START ENCOUNTER</div>


        </div>
    );
}

export default Title