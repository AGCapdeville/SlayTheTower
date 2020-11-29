export const monsters = [
    {
        name: 'Slime',
        aligment: [],
        aligmentDuration: [],
        // health: 36, <- normal health
        health: 1,
        total: 36,
        defense: 0,
        gold: 15,
        telegraphing: { 
                name: ['Spit'],
                target: ['hero'],
                effect: ['damage'],
                power: [8]
            },
        nMoves: 3,
        moves: [
            {
                name: ['Spit'],
                target: ['hero'],
                effect: ['damage'],
                power: [8]
            },
            {
                name: ['Whip','Whip'],
                target: ['hero','hero'],
                effect: ['bleed','damage'],
                power: [2, 3]
            },
            {
                name : ['Replenish'],
                target: ['self'],
                effect: ['heal'],
                power: [25]
            }
        ]
    },
    {
        name: 'Nul',
        aligment: [],
        aligmentDuration: [],
        // health: 36, <- normal health
        health: 1,
        total: 36,
        defense: 0,
        gold: 25,
        telegraphing: { 
                name: ['Force','Sleep'],
                target: ['hero','hero'],
                effect: ['damage','fatigue'],
                power: [5,2]
            },
        nMoves: 2,
        moves: [
            {
                name: ['Power','Drain'],
                target: ['hero','foe'],
                effect: ['damage','heal'],
                power: [13,10]
            },
            {
                name : ['Beam','Nul'],
                target: ['hero','foe'],
                effect: ['damage','idle'],
                power: [20,2]
            }
        ]
    },
    {
        name: 'Enforcer',
        aligment: [],
        aligmentDuration: [],
        // health: 46, <- normal health
        health: 1,
        total: 36,
        defense: 5,
        gold: 25,
        telegraphing: { 
                name: ['Alert','Focus'],
                target: ['hero','foe'],
                effect: ['damage','defense'],
                power: [10,20]
            },
        nMoves: 2,
        moves: [
            {
                name: ['Alert','Focus'],
                target: ['hero','foe'],
                effect: ['damage','defense'],
                power: [10,20]
            },
            {
                name : ['Fire','Recharge'],
                target: ['hero','foe'],
                effect: ['damage','idle'],
                power: [20,2]
            }
        ]
    },
    {
        name: 'Fire',
        aligment: [],
        aligmentDuration: [],
        // health: 36, <- normal health
        health: 1,
        total: 40,
        defense: 0,
        gold: 30,
        telegraphing: { 
                name: ['Overwhelming Fire'],
                target: ['hero'],
                effect: ['fatigue'],
                power: [4]
            },
        nMoves: 2,
        moves: [
            {
                name: ['Burn'],
                target: ['hero'],
                effect: ['damage'],
                power: [15]
            },
            {
                name: ['Searing Sight','Burning Eyes'],
                target: ['hero','hero'],
                effect: ['stun','damage'],
                power: [2,5]
            }
        ]
    },{
        name: 'Stone',
        aligment: [],
        aligmentDuration: [],
        // health: 80, <- normal health
        health: 1,
        total: 80,
        defense: 5,
        gold: 40,
        telegraphing: { 
                name: ['Slam','Shatter'],
                target: ['hero','hero'],
                effect: ['damage','bleed'],
                power: [10,2]
            },
        nMoves: 3,
        moves: [
            {
                name: ['Regenerate','idle'],
                target: ['foe','foe'],
                effect: ['heal','idle'],
                power: [20, 2]
            },
            {
                name: ['Slam'],
                target: ['hero'],
                effect: ['damage'],
                power: [10]
            },{
                name: ['Timber','Shatter'],
                target: ['hero','foe'],
                effect: ['stun','damage'],
                power: [2,5]
            }
        ]
    }
]