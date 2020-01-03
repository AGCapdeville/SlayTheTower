import React from 'react'
import settingsStyle from "./settings.module.scss";

const Settings = ({ setCurrentScreen }) => {
    return (
    <div className={settingsStyle.game} >

        <div className={settingsStyle.title}>
            SETTINGS
        </div>
        
        <div className={settingsStyle.menu} 
        onClick={() => setCurrentScreen('Title')}>
            RETURN </div>
        
    </div>
    );
}

export default Settings;