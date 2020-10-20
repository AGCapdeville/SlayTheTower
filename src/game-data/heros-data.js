import {cards} from './card-data'

export const heros = [

    {
        utilityHero: 'staff',
        utilityHeroStatus: 'standing',
        utilityHeroAilgments: [],

        offenseHero: 'sword',
        offenseHeroStatus: 'standing',
        offenseHeroAilgments: [],

        defenseHero: 'shield',
        defenseHeroStatus: 'standing',
        defenseHeroAilgments: [],

        health: 55,
        maxHealth: 55,
        energy: 3,
        defense: 0,
        deck: [0,0,0,0,0,1,1,1,1,1,2].map(id => cards[id]),
        hand: [],
        discard: [],
        voidDeck: [],
        gold: 50,
        items: []
    }
    
];









