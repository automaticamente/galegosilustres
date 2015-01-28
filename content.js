var availablePersons = [
    {
        signature: 'Rosalía de Castro (1837-1885)',
        images: ['rosalia1.jpg', 'rosalia2.jpg']
    },
    {
        signature: 'Manuel Murguía (1833-1923)',
        images: ['murguia1.jpg', 'murguia2.jpg']
    },
    {
        signature: 'Alexandre Bóveda (1903-1936)',
        images: ['boveda1.jpg', 'boveda2.jpg']
    },
    {
        signature: 'Carvalho Calero (1910-1990)',
        images: ['calero1.jpg', 'calero2.jpg']
    },
    {
        signature: 'Ramón Cabanillas (1876-1959)',
        images: ['cabanillas1.jpg', 'cabanillas2.jpg']
    },
    {
        signature: 'Castelao (1886-1950)',
        images: ['castelao1.jpg', 'castelao2.jpg']
    },
    {
        signature: 'Emilia Pardo Bazán (1851-1921)',
        images: ['bazan1.jpg', 'bazan2.jpg']
    },
    {
        signature: 'Eduardo Blanco Amor (1897-1979)',
        images: ['blanco1.jpg', 'blanco2.jpg']
    },
    {
        signature: 'Ramón Otero Pedrayo (1897-1979)',
        images: ['otero1.jpg', 'otero2.jpg']
    },
    {
        signature: 'Álvaro Cunqueiro (1911-1981)',
        images: ['cunqueiro1.jpg', 'cunqueiro2.jpg']
    },
    {
        signature: 'Concepción Arenal (1820-1893)',
        images: ['concepcion1.jpg']
    }
];

var reggaetonArtists = [
    'farruko',
    'don omar',
    'cosculluela',
    'arcangel',
    'tego calderon',
    'tito el bambino'
];

module.exports = {
    persons: availablePersons,
    artists: reggaetonArtists,
    debugContent: require('./debug.json')
};
