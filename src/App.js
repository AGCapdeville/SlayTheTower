import React from 'react';
import Title from './screens/title';
import Encounter from './screens/encounter';
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
