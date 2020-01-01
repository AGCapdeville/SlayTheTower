import React, { useState } from 'react'
import TitleScreen from './screens/title'
import HeroScreen from './screens/hero'

const App = () => {
  const state = {};

  const [currentScreen, setCurrentScreen] = useState('TitleScreen');

  const Bonfire = () => <div onClick={() => setCurrentScreen('TitleScreen')} >Bonfire</div>
  const Battle = () => <div onClick={() => setCurrentScreen('TitleScreen')} >Battle</div>
  const Shop = () => <div onClick={() => setCurrentScreen('TitleScreen')} >Shop</div>
  const Settings = () => <div onClick={() => setCurrentScreen('TitleScreen')} >Settings</div>

  const screens = {
    TitleScreen,
    HeroScreen,
    Bonfire,
    Battle,
    Shop,
    Settings,    
  };

  const currentScreenComponent = screens[currentScreen];
  
  return currentScreenComponent({ setCurrentScreen })
}

export default App
