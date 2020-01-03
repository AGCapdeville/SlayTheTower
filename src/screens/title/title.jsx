import React from 'react'
import titleStyle from "./title.module.scss";

const Title = ({ setCurrentScreen }) => {
    return (
        <div className={titleStyle.game} >
        <div className={titleStyle.title} >SLAY THE TOWER</div>
        <div className={titleStyle.menu} onClick={() => setCurrentScreen('Hero')}> START </div>
        <div className={titleStyle.menu} onClick={() => setCurrentScreen('Settings')}> SETTINGS </div>
    </div>
    );
}

export default Title