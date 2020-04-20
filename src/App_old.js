import { useState } from 'react'
import Title from './screens/title'
// import Hero from './screens/hero'
// import Settings from './screens/settings'
import Encounter from './screens/encounter'
// import gameData from './game-data.js';


const App = () => {
  
  const [currentScreen, setCurrentScreen] = useState('Title');
  // const [gameState, setCurrentGameState] = useState({});

  const screens = {
    Title,
    Encounter
  };

  const currentScreenComponent = screens[currentScreen];
  
  return currentScreenComponent({ setCurrentScreen })

}

export default App
