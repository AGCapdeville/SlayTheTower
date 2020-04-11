import React, { useState } from 'react'
import Title from './screens/title'
import Hero from './screens/hero'
import Settings from './screens/settings'
import Encounter from './screens/encounter'
import gameData from './game-data.js';

import { useHealth } from './ducks/health'


const App = () => {
  
  const health = useHealth()
  
  const [currentScreen, setCurrentScreen] = useState('Title');
  // const [gameState, setCurrentGameState] = useState({});

  const initializeHero = (type) => {
  }

  const screens = {
    Title,
    Hero,
    Encounter,
    // Bonfire,
    // Battle,
    // Shop,
    Settings,    
  };

  const currentScreenComponent = screens[currentScreen];
  
  return currentScreenComponent({ setCurrentScreen, initializeHero })

}

export default App
