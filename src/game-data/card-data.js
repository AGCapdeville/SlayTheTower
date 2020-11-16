
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
            power: [7]
        },
        description: "7 Damage",
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
            power: [7]
        },
        description: "+7 Defense",
    },
    {   
        name: 'Heal',
        requiredHero: 'u',
        art: '<art url>',
        type: 'skill',
        energy: 1,
        exhaust: true,
        action: {
            target: ['player'],
            effect: ['heal'],
            power: [8]
        },
        description: "Heal +8",
        cost: 100,
    },
    {
        name: 'Trading Blows',
        requiredHero: 'o',
        art: '<art url>',
        type: 'attack',
        energy: 1,
        exhaust: true,
        action: {
            target: ['foe', 'hero'],
            effect: ['damage', 'damage'],
            power: [20, 7]
        },
        description: "Deal 20 Damage, take 5 Damage",
        cost: 45,
    },
    {
        name: 'Radiant Shield',
        requiredHero: 'du',
        art: '<art url>',
        type: 'mix',
        energy: 2,
        exhaust: true,
        action: {
            target: ['player','player'],
            effect: ['defense','heal'],
            power: [10,5]
        },
        description: "+10 Defense, +5 health",
        cost: 45,
    },
    {
        name: 'Shield Bash',
        requiredHero: 'd',
        art: '<art url>',
        type: 'defend',
        energy: 1,
        exhaust: false,
        action: {
            target: ['foe'],
            effect: ['defenseTotal'],
            power: [1]
        },
        description: "Deal damage equal to your armor",
        cost: 45,
    },
    {
        name: 'Blinding Ray',
        requiredHero: 'u',
        art: '<art url>',
        type: 'utility',
        energy: 2,
        exhaust: false,
        action: {
            target: ['foe','player'],
            effect: ['blind','delayUtility'],
            power: [1,1]
        },
        description: "Blind enemy for 1 turns",
        cost: 45,
    },
];

