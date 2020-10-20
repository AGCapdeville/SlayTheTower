
//  CARD LAYOUT:
// {
//     name: '',
//     requiredHero: 'u',
//     art: '<art url>',
//     type: 'attack',
//     energy: 1,
//     exhaust: false,
//     action: {
//         target: ['foe'],
//         effect: ['damage'],
//         power: [5]
//     },
//     description: "5 Damage",
//     card_id: 0
// },


// requiredHero :

// a - any hero standing
// o - off needed
// u - util needed
// d - def needed
// do - def & off needed
// ud - util & def needed
// ou - off & util needed
// e - every hero needed


export const cards = [
    {
        name: 'Take the Offensive',
        requiredHero: 'a',
        art: '<art url>',
        type: 'attack',
        energy: 1,
        exhaust: false,
        action: {
            target: ['foe'],
            effect: ['damage'],
            power: [5]
        },
        description: "5 Damage",
        card_id: 0
    },
    {   
        name: 'Defensive Tactics',
        requiredHero: 'a',
        art: '<art url>',
        type: 'defend',
        energy: 1,
        exhaust: false,
        action: {
            target: ['player'],
            effect: ['defense'],
            power: [5]
        },
        description: "+5 Defense",
        card_id: 1
    },
    {   
        name: 'Heal',
        requiredHero: 'u',
        art: '<art url>',
        type: 'skill',
        energy: 2,
        exhaust: true,
        action: {
            target: ['player'],
            effect: ['heal'],
            power: [8]
        },
        description: "Heal 8 Damage",
        card_id: 2,
        cost: 100,
    },
    {
        name: 'Lunge From Above',
        requiredHero: 'a',
        art: '<art url>',
        type: 'attack',
        energy: 1,
        exhaust: true,
        action: {
            target: ['foe', 'hero'],
            effect: ['damage', 'damage'],
            power: [20, 5]
        },
        description: "Deal 20 Damage, take 5 Damage",
        card_id: 3,
        cost: 75,
    }
];

