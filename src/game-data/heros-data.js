import {cards} from './card-data'

export const heros = [
    {
        hero: 'sword',
        health: 55, 
        energy: 3,
        armor: 0,
        deck: [0,0,0,0,0,1,1,1,1,1,2].map(id => cards[id]),
        hand: [],
        discard: [],
        void: []
    },

    {
        hero: 'fire',
        health: 45,
        energy: 4,
        armor: 0,
        deck: [0,0,0,0,0,1,1,1,1,1,2],
        hand: [],
        discard: [],
        void: []
    }
];









