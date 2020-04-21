export const playerData = {
    name: '',
    hero: '',
    floor: 0,
};

export const heros = [
    {
        hero: 'sword',
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
        hero: 'fire',
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

