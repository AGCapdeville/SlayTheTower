export const monsters = [
    {
        name: 'Slime',
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

    // {
    //     name: 'Living Armor',
    //     art: 'https://i.imgur.com/yl0eGRj.png?4',
    //     health: 52,
    //     totalHealth: 52,
    //     defense: 0,
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