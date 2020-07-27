import React from 'react';
import Title from './components/screens/title';
import Encounter from './components/screens/encounter';
import End from './components/screens/end';
import HeroSelection from './components/screens/hero-selection';
import Map from './components/screens/map';
import { useScreen } from './ducks/screen';

const screens = {
  Title,
  Encounter,
  End,
  HeroSelection,
  Map,
}

const App = () => {
  const screen = useScreen();
  const Screen = screens[screen];

  return <Screen />
}

export default App
