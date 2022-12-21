const commentsMock = [
  {
    'id': 0,
    'author': 'Author 1',
    'comment': 'Comment text 1',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'angry'
  },
  {
    'id': 1,
    'author': 'Author 2',
    'comment': 'Comment text 2',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 2,
    'author': 'Author 3',
    'comment': 'Comment text 3',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 3,
    'author': 'Author 4',
    'comment': 'Comment text 4',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'angry'
  },
  {
    'id': 4,
    'author': 'Author 5',
    'comment': 'Comment text 5',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 5,
    'author': 'Author 6',
    'comment': 'Comment text 6',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'puke'
  },
  {
    'id': 6,
    'author': 'Author 7',
    'comment': 'Comment text 7',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 7,
    'author': 'Author 8',
    'comment': 'Comment text 8',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'puke'
  },
  {
    'id': 8,
    'author': 'Author 9',
    'comment': 'Comment text 9',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 9,
    'author': 'Author 10',
    'comment': 'Comment text 10',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 10,
    'author': 'Author 11',
    'comment': 'Comment text 11',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'puke'
  },
  {
    'id': 11,
    'author': 'Author 12',
    'comment': 'Comment text 12',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 12,
    'author': 'Author 13',
    'comment': 'Comment text 13',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 13,
    'author': 'Author 14',
    'comment': 'Comment text 14',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'puke'
  },
  {
    'id': 14,
    'author': 'Author 15',
    'comment': 'Comment text 15',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 15,
    'author': 'Author 16',
    'comment': 'Comment text 16',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'puke'
  },
  {
    'id': 16,
    'author': 'Author 17',
    'comment': 'Comment text 17',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'angry'
  },
  {
    'id': 17,
    'author': 'Author 18',
    'comment': 'Comment text 18',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 18,
    'author': 'Author 19',
    'comment': 'Comment text 19',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'sleeping'
  },
  {
    'id': 19,
    'author': 'Author 20',
    'comment': 'Comment text 20',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 20,
    'author': 'Author 21',
    'comment': 'Comment text 21',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 21,
    'author': 'Author 22',
    'comment': 'Comment text 22',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'angry'
  },
  {
    'id': 22,
    'author': 'Author 23',
    'comment': 'Comment text 23',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 23,
    'author': 'Author 24',
    'comment': 'Comment text 24',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'sleeping'
  },
  {
    'id': 24,
    'author': 'Author 25',
    'comment': 'Comment text 25',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 25,
    'author': 'Author 26',
    'comment': 'Comment text 26',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'angry'
  },
  {
    'id': 26,
    'author': 'Author 27',
    'comment': 'Comment text 27',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'sleeping'
  },
  {
    'id': 27,
    'author': 'Author 28',
    'comment': 'Comment text 28',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 28,
    'author': 'Author 29',
    'comment': 'Comment text 29',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 29,
    'author': 'Author 30',
    'comment': 'Comment text 30',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 30,
    'author': 'Author 31',
    'comment': 'Comment text 31',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 31,
    'author': 'Author 32',
    'comment': 'Comment text 32',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'sleeping'
  },
  {
    'id': 32,
    'author': 'Author 33',
    'comment': 'Comment text 33',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 33,
    'author': 'Author 34',
    'comment': 'Comment text 34',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 34,
    'author': 'Author 35',
    'comment': 'Comment text 35',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  },
  {
    'id': 35,
    'author': 'Author 36',
    'comment': 'Comment text 36',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'sleeping'
  }
];

export { commentsMock };
