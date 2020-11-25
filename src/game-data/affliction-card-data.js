export const afflictionCards = [
    {
        name: 'Curse',
        requiredHero: 'a',
        art: '<art url>',
        type: 'curse',
        energy: 0,
        exhaust: false,
        action: {
            target: ['player'],
            effect: ['curse'],
            power: [0]
        },
        description: "Party is cursed, can't be used",
    },
    {   
        name: 'Fatigue',
        requiredHero: 'a',
        art: '<art url>',
        type: 'affliction',
        energy: 1,
        exhaust: true,
        action: {
            target: ['affliction'],
            effect: ['affliction'],
            power: [0]
        },
        description: "Party is fatigued\nVOID",
    },{
        name: 'Bleed',
        requiredHero: 'a',
        art: '<art url>',
        type: 'affliction',
        energy: 0,
        exhaust: true,
        action: {
            target: ['affliction', 'player'],
            effect: ['affliction', 'damage'],
            power: [3, 3]
        },
        description: "Take 3 damage \nVOID",
    },
]