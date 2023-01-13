const filmsMock = [
  {
    'id': 0,
    'comments': [0, 1, 2],
    'filmInfo': {
      'title': 'Фильм 1',
      'alternativeTitle': 'Фильм 1 оригинальное название',
      'totalRating': 7.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 1',
      'writers': ['Сценарист 1-1', 'Сценарист 1-2'],
      'actors': ['Актёр 1-1', 'Актёр 1-2', 'Актёр 1-3'],
      'release': {
        'date': '1819-05-11T00:00:00.000Z',
        'releaseCountry': 'USA'
      },
      'duration': 77,
      'genre': ['comedy', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 1'
    },
    'userDetails': {
      'watchlist': true,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': 1,
    'comments': [3, 4, 5],
    'filmInfo': {
      'title': 'Фильм 2',
      'alternativeTitle': 'Фильм 2 оригинальное название',
      'totalRating': 8.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 2',
      'writers': ['Сценарист 2-1', 'Сценарист 2-2'],
      'actors': ['Актёр 2-1', 'Актёр 2-2', 'Актёр 2-3'],
      'release': {
        'date': '1820-05-11T00:00:00.000Z',
        'releaseCountry': 'Mexico'
      },
      'duration': 97,
      'genre': ['horror', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 2'
    },
    'userDetails': {
      'watchlist': true,
      'alreadyWatched': false,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
  {
    'id': 2,
    'comments': [6, 7, 8],
    'filmInfo': {
      'title': 'Фильм 3',
      'alternativeTitle': 'Фильм 3 оригинальное название',
      'totalRating': 3.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 3',
      'writers': ['Сценарист 3-1', 'Сценарист 3-2'],
      'actors': ['Актёр 3-1', 'Актёр 3-2', 'Актёр 3-3'],
      'release': {
        'date': '1821-05-11T00:00:00.000Z',
        'releaseCountry': 'Spain'
      },
      'duration': 77,
      'genre': ['drama', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 3'
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': 3,
    'comments': [9, 10, 11],
    'filmInfo': {
      'title': 'Фильм 4',
      'alternativeTitle': 'Фильм 4 оригинальное название',
      'totalRating': 5.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 4',
      'writers': ['Сценарист 4-1', 'Сценарист 4-2'],
      'actors': ['Актёр 4-1', 'Актёр 4-2', 'Актёр 4-3'],
      'release': {
        'date': '1822-05-11T00:00:00.000Z',
        'releaseCountry': 'France'
      },
      'duration': 77,
      'genre': ['comedy', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 4'
    },
    'userDetails': {
      'watchlist': true,
      'alreadyWatched': false,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
  {
    'id': 4,
    'comments': [13, 14, 15],
    'filmInfo': {
      'title': 'Фильм 5',
      'alternativeTitle': 'Фильм 5 оригинальное название',
      'totalRating': 1.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 5',
      'writers': ['Сценарист 5-1', 'Сценарист 5-2'],
      'actors': ['Актёр 5-1', 'Актёр 5-2', 'Актёр 5-3'],
      'release': {
        'date': '1823-05-11T00:00:00.000Z',
        'releaseCountry': 'Germany'
      },
      'duration': 73,
      'genre': ['fantasy', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 5'
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': 5,
    'comments': [16, 17, 18],
    'filmInfo': {
      'title': 'Фильм 6',
      'alternativeTitle': 'Фильм 6 оригинальное название',
      'totalRating': 9.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 10,
      'director': 'Режиссёр 6',
      'writers': ['Сценарист 6-1', 'Сценарист 6-2'],
      'actors': ['Актёр 6-1', 'Актёр 6-2', 'Актёр 6-3'],
      'release': {
        'date': '1824-05-11T00:00:00.000Z',
        'releaseCountry': 'Canada'
      },
      'duration': 37,
      'genre': ['action', 'arthouse'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 6'
    },
    'userDetails': {
      'watchlist': true,
      'alreadyWatched': false,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
  {
    'id': 6,
    'comments': [19, 20, 21],
    'filmInfo': {
      'title': 'Фильм 7',
      'alternativeTitle': 'Фильм 7 оригинальное название',
      'totalRating': 8.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 20,
      'director': 'Режиссёр 7',
      'writers': ['Сценарист 7-1', 'Сценарист 7-2'],
      'actors': ['Актёр 7-1', 'Актёр 7-2', 'Актёр 7-3'],
      'release': {
        'date': '1825-05-11T00:00:00.000Z',
        'releaseCountry': 'Australia'
      },
      'duration': 57,
      'genre': ['comedy', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 7'
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': 7,
    'comments': [22, 23, 24],
    'filmInfo': {
      'title': 'Фильм 8',
      'alternativeTitle': 'Фильм 8 оригинальное название',
      'totalRating': 9.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 8',
      'writers': ['Сценарист 8-1', 'Сценарист 8-2'],
      'actors': ['Актёр 8-1', 'Актёр 8-2', 'Актёр 8-3'],
      'release': {
        'date': '1826-05-11T00:00:00.000Z',
        'releaseCountry': 'New Zealand'
      },
      'duration': 74,
      'genre': ['triller', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 8'
    },
    'userDetails': {
      'watchlist': true,
      'alreadyWatched': false,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
  {
    'id': 8,
    'comments': [25, 26, 27],
    'filmInfo': {
      'title': 'Фильм 9',
      'alternativeTitle': 'Фильм 9 оригинальное название',
      'totalRating': 7.9,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 9',
      'writers': ['Сценарист 9-1', 'Сценарист 9-2'],
      'actors': ['Актёр 9-1', 'Актёр 9-2', 'Актёр 9-3'],
      'release': {
        'date': '1827-05-11T00:00:00.000Z',
        'releaseCountry': 'Ukraine'
      },
      'duration': 98,
      'genre': ['drama', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 8'
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': 9,
    'comments': [28, 29, 30],
    'filmInfo': {
      'title': 'Фильм 10',
      'alternativeTitle': 'Фильм 10 оригинальное название',
      'totalRating': 10.0,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 10',
      'writers': ['Сценарист 10-1', 'Сценарист 10-2'],
      'actors': ['Актёр 10-1', 'Актёр 10-2', 'Актёр 10-3'],
      'release': {
        'date': '1828-05-11T00:00:00.000Z',
        'releaseCountry': 'England'
      },
      'duration': 88,
      'genre': ['comedy', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 10'
    },
    'userDetails': {
      'watchlist': true,
      'alreadyWatched': false,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
  {
    'id': 10,
    'comments': [31, 32, 33],
    'filmInfo': {
      'title': 'Фильм 11',
      'alternativeTitle': 'Фильм 11 оригинальное название',
      'totalRating': 7.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 11',
      'writers': ['Сценарист 11-1', 'Сценарист 11-2'],
      'actors': ['Актёр 11-1', 'Актёр 11-2', 'Актёр 11-3'],
      'release': {
        'date': '1829-05-11T00:00:00.000Z',
        'releaseCountry': 'Italy'
      },
      'duration': 73,
      'genre': ['comedy', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 11'
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': 11,
    'comments': [34, 35, 36],
    'filmInfo': {
      'title': 'Фильм 12',
      'alternativeTitle': 'Фильм 12 оригинальное название',
      'totalRating': 7.5,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 0,
      'director': 'Режиссёр 12',
      'writers': ['Сценарист 12-1', 'Сценарист 12-2'],
      'actors': ['Актёр 12-1', 'Актёр 12-2', 'Актёр 12-3'],
      'release': {
        'date': '1830-05-11T00:00:00.000Z',
        'releaseCountry': 'USA'
      },
      'duration': 77,
      'genre': ['fantasy', 'action'],
      'description': 'Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. Описание фильма из более 139 символов. 12'
    },
    'userDetails': {
      'watchlist': true,
      'alreadyWatched': false,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  }
];

export { filmsMock };
