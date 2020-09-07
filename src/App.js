import React from 'react';
import Title from './components/screens/title';
import Encounter from './components/screens/encounter';
import Resolution from './components/screens/resolution';
import HeroSelection from './components/screens/hero-selection';
import Map from './components/screens/map';
import { useScreen } from './ducks/screen';

const screens = {
  Title,
  Encounter,
  Resolution,
  HeroSelection,
  Map,
}

const App = () => {
  const screen = useScreen();
  const Screen = screens[screen];

  return <Screen />
}

export default App
