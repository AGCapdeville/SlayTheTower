



export const creeps = [
    {
        name: 'Slime',
        art: 'https://i.imgur.com/Sun4iBT.png?1',
        health: 10,
        mod: 5,
        armor: 0,
        moves: {
            'whip':{
                priority: 0,
                target: ['hero'],
                effect: ['damage'],
                power: [5]
            },
            'spit':{
                priority: 1,
                target: ['hero'],
                effect: ['damage'],
                power: [8]
            },
            'soften':{
                priority: 1,
                target: ['self'],
                effect: ['armor'],
                power: [12]
            }
        }
    },
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