import React from 'react';
import Title from './components/screens/title';
import Combat from './components/screens/combat';
import Resolution from './components/screens/resolution';
import HeroSelection from './components/screens/hero-selection';
import Map from './components/screens/map';
import Shop from './components/screens/shop';
import Bonfire from './components/screens/bonfire';
import Trial from './components/screens/trial';

import { useScreen } from './ducks/screen';

const screens = {
  Title,
  Combat,
  Resolution,
  HeroSelection,
  Map,
  Shop,
  Bonfire,
  Trial
}

const App = () => {
  const screen = useScreen();
  const Screen = screens[screen];

  return <Screen />
}

export default App
