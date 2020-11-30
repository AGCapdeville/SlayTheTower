export const trials = [
    {
        title: 'Great Relics',
        description: 'The party stumbles upon a cavern of treasure. The tresaure reek of decay and death. Do you risk your party for great reward or avoid the risk?',
        skipable: true,
        options: [
            {
                description: '[ Relic of Life ] A chance to increase your parties max health. The relic could be cursed ...',
                odds: 50,
                reward: 'maxHealth',
                reward_value: 10,
                lose: 'curse',
                lose_value: 2
            },
            {
                description: '[ Relic of Wealth ] A relic worth it\'s weight in gold. The relic could be cursed ...',
                odds: 40,
                reward: 'wealth',
                reward_value: 40,
                lose: 'curse',
                lose_value: 1
            }
        ]
    },

]