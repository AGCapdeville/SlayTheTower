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
        telegraphing: [{ 
                name: ['Spit'],
                order: 0,
                target: ['hero'],
                effect: ['damage'],
                power: [8]
            }],
        moves: [
            {
                name: ['Spit'],
                order: 0,
                target: ['hero'],
                effect: ['damage'],
                power: [8]
            },
            {
                name: ['Whip'],
                order: 1,
                target: ['hero'],
                effect: ['damage'],
                power: [13]
            },
            {
                name : ['Soften'],
                order: 2,
                target: ['self'],
                effect: ['defense'],
                power: [12]
            }
        ]
    },
    {
        name: 'Fire',
        aligment: [],
        aligmentDuration: [],
        // health: 36, <- normal health
        health: 40,
        total: 40,
        defense: 0,
        gold: 30,
        telegraphing: [{ 
                name: ['Spit'],
                order: 0,
                target: ['hero'],
                effect: ['damage'],
                power: [8]
            }],
        moves: [
            {
                name: ['Spit'],
                order: 0,
                target: ['hero'],
                effect: ['damage'],
                power: [8]
            },
            {
                name: ['Whip'],
                order: 1,
                target: ['hero'],
                effect: ['damage'],
                power: [13]
            },
            {
                name : ['Soften'],
                order: 2,
                target: ['self'],
                effect: ['defense'],
                power: [12]
            }
        ]
    }
]