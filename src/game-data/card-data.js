export const cards = [
    {
        name: 'Slash',
        art: '<art url>',
        type: 'attack',
        energy: 1,
        exhaust: false,
        action: {
            target: ['foe'],
            effect: ['damage'],
            power: [5]
        },
        description: "Deal 5 damage",
        card_id: 0
        
    },
    {   
        name: 'Guard',
        art: '<art url>',
        type: 'defend',
        energy: 1,
        exhaust: false,
        action: {
            target: ['hero'],
            effect: ['armor'],
            power: [5]
        },
        description: "+5 Armor",
        card_id: 1
    },
    {   
        name: 'Heal',
        art: '<art url>',
        type: 'skill',
        energy: 2,
        exhaust: true,
        action: {
            target: ['hero'],
            effect: ['heal'],
            power: [8]
        },
        description: "Heal 8 damage",
        card_id: 2
    },
];