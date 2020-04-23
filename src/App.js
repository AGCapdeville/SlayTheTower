import React from 'react';
import Title from './components/title';
import Encounter from './components/encounter';
import { useScreen } from './ducks/screen';

const screens = {
  Title,
  Encounter,
}

const App = () => {
  const screen = useScreen();
  const Screen = screens[screen];

  return <Screen />
}

export default App
