import React from 'react';
import Title from './components/screens/title';
import Encounter from './components/screens/encounter';
import End from './components/screens/end';
import { useScreen } from './ducks/screen';

const screens = {
  Title,
  Encounter,
  End,
}

const App = () => {
  const screen = useScreen();
  const Screen = screens[screen];

  return <Screen />
}

export default App
