const DATE_FORMAT_SHORT = 'YYYY';
const DATE_FORMAT_FULL = 'DD MMMM YYYY';
const COMMENT_FORMS = ['comment', 'comments'];
const FILMS_COUNT = 13;
const FILMS_COUNT_PER_STEP = 5;
const TOP_RATED_FILMS_COUNT = 2;
const TOP_COMMENTED_FILMS_COUNT = 2;
const ESCAPE_KEYCODE = 27;

const DAYJS_DURATION_FORMAT = {
  short: 'm[m]',
  full: 'H[h] m[m]'
};

const FILM_FILTER_TYPES_BY_HASH = {
  all: null,
  watchlist: 'watchlist',
  history: 'alreadyWatched',
  favorites: 'favorite'
};

export {
  DATE_FORMAT_SHORT,
  DATE_FORMAT_FULL,
  COMMENT_FORMS,
  FILMS_COUNT,
  DAYJS_DURATION_FORMAT,
  FILMS_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  TOP_COMMENTED_FILMS_COUNT,
  ESCAPE_KEYCODE,
  FILM_FILTER_TYPES_BY_HASH
};
