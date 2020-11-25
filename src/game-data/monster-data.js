export const monsters = [
    {
        name: 'Slime',
        aligment: [],
        aligmentDuration: [],
        // health: 36, <- normal health
        health: 10,
        total: 36,
        defense: 0,
        gold: 10,
        telegraphing: { 
                name: ['Spit'],
                order: 0,
                target: ['hero'],
                effect: ['damage'],
                moves: 1,
                power: [8]
            },
        moves: [
            {
                name: ['Spit'],
                order: 0,
                target: ['hero'],
                effect: ['damage'],
                moves: 1,
                power: [8]
            },
            {
                name: ['Whip','Whip'],
                order: 1,
                target: ['hero','hero'],
                effect: ['bleed','damage'],
                moves: 2,
                power: [2, 5]
            },
            {
                name : ['Soften'],
                order: 2,
                target: ['self'],
                effect: ['defense'],
                moves: 1,
                power: [12]
            }
        ]
    },
    {
        name: 'Fire',
        aligment: [],
        aligmentDuration: [],
        // health: 36, <- normal health
        health: 10,
        total: 40,
        defense: 0,
        gold: 30,
        telegraphing: { 
                name: ['Overwhelming Fire'],
                order: 0,
                target: ['hero'],
                effect: ['fatigue'],
                moves: 1,
                power: [3]
            },
        moves: [
            {
                name: ['Burn'],
                order: 1,
                target: ['hero'],
                effect: ['damage'],
                moves: 1,
                power: [15]
            },
            {
                name: ['Searing Sight'],
                order: 0,
                target: ['hero'],
                effect: ['stun'],
                moves: 1,
                power: [1]
            }
        ]
    }
]