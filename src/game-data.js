export const playerData = {
    name: '',
    hero: '',
    floor: 0,
};

export const heroDate = [
    {
        hero: 'warrior',
        health: 55, 
        energy: 3,
        mechanic: {
            cards: [
                'slash', 'slash', 'slash', 'slash', 'slash',
                'guard', 'guard', 'guard', 'guard', 'heal' 
            ],
            deck: [], 
            hand: [],
            gravyard: [],

        }
    },
    {
        hero: 'mage',
        health: 45,
        energy: 4,
        mechanic: {
            cards: [
                'fire ball', 'fire ball', 'fire ball', 'fire ball', 'fire ball',
                'cast shield', 'cast shield', 'cast shield', 'channel', 'channel'
            ],
            deck: [],
            hand: [],
            gravyard: []
        }
    }
];

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

export const cards = [
    {   name: 'slash',
        art: 'art uri',
        type: 'attack',
        energy: 1,
        exhaust: false,
        heal: 0,
        dmg: 4,
        def: 0,
        target: 1,
    },
    {   name: 'guard',
        art: 'arturigoes here',
        type: 'deffend',
        energy: 1,
        exhaust: false,
        heal: 0,
        dmg: 0,
        def: 4,
        target: 0,
    },
    {   name: 'heal',
        art: 'arturigoes here',
        type: 'skill',
        energy: 1,
        exhaust: true,
        heal: 5,
        dmg: 0,
        def: 0,
        target: 0,
    },
];