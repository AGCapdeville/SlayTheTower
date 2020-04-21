



export const creepData = [
    {
        name: 'slime',
        properties: {
            art: 'art uri',
            health: {
                base: 10,
                mod: 5
            },
            attacks: {
                move: ['whip', 'spit'],
                dmg: [5, 8]
            },
            deffends: {
                move: ['soften'],
                def: [5]
            }
        }
    },
    {
        name: 'living armor',
        properties: {
            art: 'art uri',
            health: {
                base: 15,
                mod: 5
            },
            attacks: {
                move: ['strike'],
                dmg: [5]
            },
            deffends: {
                move: ['meld'],
                def: [10]
            }
        }
    },
    {
        name: 'spooky skeleton',
        properties: {
            art: 'art uri',
            health: {
                base: 10,
                mod: 6
            },
            attacks: {
                move: ['tackle', 'smash'],
                dmg: [4, 8]
            },
            deffends: {
                move: ['calcium'],
                def: [6]
            }
        }
    },
]
