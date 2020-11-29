import {cards} from './card-data'

export const heros = [

    {
        utilityHero: 'staff',
        utilityHeroStatus: 'standing',
        utilityHeroAilgments: [],
        utilityHeroAilgmentsDuration: [],

        offenseHero: 'sword',
        offenseHeroStatus: 'standing',
        offenseHeroAilgments: [],
        offenseHeroAilgmentsDuration: [],

        defenseHero: 'shield',
        defenseHeroStatus: 'standing',
        defenseHeroAilgments: [],
        defenseHeroAilgmentsDuration: [],

        health: 55,
        maxHealth: 55,
        energy: 3,
        defense: 0,
        deck: [0,0,0,0,1,1,1,1,1,2].map(id => cards[id]),

        hand: [],
        discard: [],
        voidDeck: [],
        gold: 20,
        items: []
    }
    
];









