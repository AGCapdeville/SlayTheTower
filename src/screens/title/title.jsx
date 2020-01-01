import React from 'react'
import titleStyle from "./title.module.scss";

const TitleScreen = ({ setCurrentScreen }) => {
  return (
    <div className={titleStyle.game} >
      <div className={titleStyle.title} >SLAY THE TOWER</div>
      <div className={titleStyle.menu} onClick={() => setCurrentScreen('hero')}> START </div>
      {/* <div className={titleStyle.menu} onClick={() => setCurrentScreen('Bonfire')}> BONFIRE </div> */}
      {/* <div className={titleStyle.menu} onClick={() => setCurrentScreen('Shop')}> SHOP </div> */}
      {/* <div className={titleStyle.menu} onClick={() => setCurrentScreen('Battle')}> BATTLE </div> */}
      <div className={titleStyle.menu} onClick={() => setCurrentScreen('Settings')}> SETTINGS </div>
    </div>
  );
}

export default TitleScreen