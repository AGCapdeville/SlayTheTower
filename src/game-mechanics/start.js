
// import { usePlayer } from '../ducks/player'
import { useDispatch } from 'react-redux';
import { setDeck, setHealth, setEnergy } from '../ducks/player';

import {heros} from '../game-data/heros-data';
import {cards} from '../game-data/card-data';


export default class Start{

    constructor(){
        // add ways to set player deck here later 
    }

    initialize(){
        // initialize player: Deck, Health, Energy, Armor etc
        const dispatch = useDispatch();
        dispatch(setDeck(heros[0].deck.map(id => cards[id])))
        dispatch(setHealth(heros[0].health))
        dispatch(setEnergy(heros[0].energy))
    }


}
