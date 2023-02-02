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

const USER_DETAILS_VALUES_BY_BTN_ID = {
  watchlist: 'watchlist',
  watched: 'alreadyWatched',
  favorite: 'favorite'
};

const ACTIVE_FILTER_ITEM_CLASS = 'main-navigation__item--active';
const ACTIVE_SORTING_ITEM_CLASS = 'sort__button--active';
const ACTIVE_FILM_CARD_USER_DETAIL_CLASS = 'film-card__controls-item--active';
const ACTIVE_FILM_POPUP_USER_DETAIL_CLASS = 'film-details__control-button--active';

const EMOJI_NAMES = {
  angry: 'angry',
  puke: 'puke',
  sleeping: 'sleeping',
  smile: 'smile'
};

const EMPTY_FILMS_LIST_MESSAGES = {
  all: 'There are no movies in our database',
  watchlist: 'There are no movies to watch now',
  history: 'There are no watched movies now',
  favorites: 'There are no favorite movies now'
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
  FILM_FILTER_TYPES_BY_HASH,
  ACTIVE_FILTER_ITEM_CLASS,
  ACTIVE_SORTING_ITEM_CLASS,
  ACTIVE_FILM_CARD_USER_DETAIL_CLASS,
  ACTIVE_FILM_POPUP_USER_DETAIL_CLASS,
  USER_DETAILS_VALUES_BY_BTN_ID,
  EMOJI_NAMES,
  EMPTY_FILMS_LIST_MESSAGES
};
