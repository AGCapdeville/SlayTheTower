import { useDispatch } from 'react-redux';
import { useState } from 'react'

// screens:
import Title from './screens/title'
import Encounter from './screens/encounter'

import { setScreen, useScreen } from './ducks/screen'



const App = () => {

  const dispatch = useDispatch();
  const screen = useScreen();


  return ( screen )
}

export default App
