export const paths = [
    {   
        path: 'end',
        entryPoint: [],
        exitPoint: [],
        pathLimit: 1,
        eventType: '',
    },
    {   
        path: 'corner',
        entryPoint: [], // this will be used during moves.
        exitPoint: [], // N E S W // this will be used for map generation and moves.
        exitPointConnected: [],
        pathLimit: 2,
        eventType: '',
    },
    {   
        path: 'hall',
        entryPoint: [],
        exitPoint: [],
        exitPointConnected: [],
        pathLimit: 2,
        eventType: '',
    },
    {   
        path: 'fork',
        entryPoint: [],
        exitPoint: [],
        exitPointConnected: [],
        pathLimit: 3,
        eventType: '',
    },
    {   
        path: 'cross',
        entryPoint: [],
        exitPoint: ['N','E','S','W'],
        exitPointConnected: [],
        pathLimit: 4,
        eventType: '',
    },
    {
        path: 'empty',
        entryPoint: [],
        exitPoint: [],
        exitPointConnected: [],
        pathLimit: 0,
        eventType: 'none',
    }

];
