


export const creeps = [
    {
        name: 'Slime',
        art: 'https://i.imgur.com/Sun4iBT.png?1',
        // health: 36, <- normal health
        health: 5,
        total: 36,
        armor: 0,
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
                effect: ['armor'],
                power: [12]
            }
        ]
    },
    {
        name: 'Living Armor',
        art: 'https://i.imgur.com/yl0eGRj.png?4',
        health: 55,
        total: 55,
        armor: 0,
        telegraphing: [
            {
                name: ['Lunging Strike'],
                order: 0,
                target: ['hero'],
                effect: ['damage'],
                power: [30]
            }],
        moves: [
            {
                name: ['Lunging Strike'],
                order: 0,
                target: ['hero'],
                effect: ['damage'],
                power: [30]
            },
            {
                name: ['Defensive Mode'],
                order: 1,
                target: ['self'],
                effect: ['wait'],
                power: [0]
            },
            {
                name: ['Repair'],
                order: 2,
                target: ['self'],
                effect: ['heal'],
                power: [20]
            },
            {
                name: ['Offensive Mode'],
                order: 3,
                target: ['self'],
                effect: ['wait'],
                power: [0]
            },
        ]
    }
    // {
    //     name: 'Living Armor',
    //     art: 'https://i.imgur.com/yl0eGRj.png?4',
    //     health: 52,
    //     totalHealth: 52,
    //     armor: 0,
    //     telegraphing: ['damage 7'],
    //     moves: {
    //         'strike':{
    //             order: 0,
    //             target: ['hero'],
    //             effect: ['damage'],
    //             power: [7]
    //         },
    //         'Repair':{
    //             order: 1,
    //             target: ['self'],
    //             effect: ['damage'],
    //             power: [10]
    //         },
    //     }
    // },
    // TO REDO: - - - - - - - - - - - - - - - - WIP:
    // {
    //     name: 'living armor',
    //     properties: {
    //         art: 'art uri',
    //         health: {
    //             base: 15,
    //             mod: 5
    //         },
    //         attacks: {
    //             move: ['strike'],
    //             dmg: [5]
    //         },
    //         deffends: {
    //             move: ['meld'],
    //             def: [10]
    //         }
    //     }
    // },
    // {
    //     name: 'spooky skeleton',
    //     properties: {
    //         art: 'art uri',
    //         health: {
    //             base: 10,
    //             mod: 6
    //         },
    //         attacks: {
    //             move: ['tackle', 'smash'],
    //             dmg: [4, 8]
    //         },
    //         deffends: {
    //             move: ['calcium'],
    //             def: [6]
    //         }
    //     }
    // },
]