


// TODO: WIP


export const guardianData = [
    {
        name: 'king slime',
        properties: {
            art: 'art uri',
            health: 50,
            attacks: {
                move: ['whip', 'flood'],
                dmg: [10, 18]
            },
            deffends: {
                move: ['swirl'],
                def: [10],
            },
            skill: {
                move: ['grow'],
                dmg: [0],
                def: [10],
                heal: [10]
            },
            special: [
                {
                    move: 'split',
                    condition: 'health < 30',
                    turns: 2,
                    spawn: ['king slime s1', 'king slime s1']
                }
            ]
        }
    },
    {
        name: 'king slime s1',
        properties: {
            art: 'art uri',
            health: 25,
            attacks: {
                move: ['whip', 'flood'],
                dmg: [5, 9]
            },
            deffends: {
                move: ['swirl'],
                def: [5],
            },
            skill: {
                move: ['grow'],
                dmg: [0],
                def: [6],
                heal: [6]
            },
            special: [
                {
                    move: 'split',
                    condition: 'health < 15',
                    turns: 1,
                    spawn: ['king slime s3', 'king slime s3']
                }
            ],   
        }
    },
    {
        name: 'king slime s3',
        properties: {
            art: 'art uri',
            health: 10,
            attacks: {
                move: ['whip'],
                dmg: [5]
            },
            deffends: {
                move: ['swirl'],
                def: [5],
            },
        }
    },
];
