
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
            power: [5]
        },
        description: "+5 Defense",
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
        description: "Heal +8 \nVOID",
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
            target: ['foe', 'player'],
            effect: ['damage', 'damage'],
            power: [20, 7]
        },
        description: "Deal 20 Damage, take 7 Damage \nVOID",
        cost: 70,
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
        description: "+10 Defense, +5 health \nVOID",
        cost: 85,
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
        cost: 80,
    },
    {
        name: 'Blinding Ray',
        requiredHero: 'u',
        art: '<art url>',
        type: 'utility',
        energy: 2,
        exhaust: true,
        action: {
            target: ['foe','player'],
            effect: ['stun','delayUtility'],
            power: [1,3]
        },
        description: "Stun enemy for 1 turn & mage for 3 turns. \nVOID",
        cost: 90,
    },
    {   
        name: 'Mend',
        requiredHero: 'u',
        art: '<art url>',
        type: 'skill',
        energy: 2,
        exhaust: false,
        action: {
            target: ['player'],
            effect: ['mend'],
            power: [0]
        },
        description: "Remove all afflictions from deck / hand & discard piles. \nVOID",
        cost: 100,
    },
];

