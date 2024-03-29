const DATE_FORMAT_SHORT = 'YYYY';
const DATE_FORMAT_FULL = 'DD MMMM YYYY';
const COMMENT_FORMS = ['comment', 'comments'];
const FILMS_COUNT_PER_STEP = 5;
const TOP_RATED_FILMS_COUNT = 2;
const TOP_COMMENTED_FILMS_COUNT = 2;
const UPDATING_COMMENT_DELAY = 500;

const DAYJS_DURATION_FORMAT = {
  short: 'm[m]',
  full: 'H[h] m[m]'
};

const FILMS_SORTING_HASHES = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const FILMS_FILTER_HASHES = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
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

const LOADING_MESSAGE = 'Loading...';

const COMMENTS_MODEL_ACTIONS = {
  INIT: 'init',
  UPDATE: 'update',
  CREATE: 'create',
  DELETE: 'delete'
};

const FILM_MODEL_ACTIONS = {
  INIT: 'init',
  CHANGE_USER_DETAILS: 'changeUserDetails',
  UPDATE: 'update'
};

const FILM_FILTER_ELEMENTS = {
  LINK: 'link',
  COUNTER: 'counter'
};

const FILM_SORTING_ELEMENTS = {
  LINK: 'link'
};

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const API_URL = {
  MOVIES: 'movies',
  COMMENTS: 'comments'
};

const DELETE_BUTTON_TEXT = {
  STATIC: 'Delete',
  LOADER: 'Deleting...'
};

const USER_TITLE = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff'
};

const FILMS_FILTER_ACTIONS = {
  CHANGE: 'change'
};

const AUTHORIZATION = 'Basic ytgr5466hy78fdsw';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

export {
  DATE_FORMAT_SHORT,
  DATE_FORMAT_FULL,
  COMMENT_FORMS,
  DAYJS_DURATION_FORMAT,
  FILMS_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  TOP_COMMENTED_FILMS_COUNT,
  FILM_FILTER_TYPES_BY_HASH,
  ACTIVE_FILTER_ITEM_CLASS,
  ACTIVE_SORTING_ITEM_CLASS,
  ACTIVE_FILM_CARD_USER_DETAIL_CLASS,
  ACTIVE_FILM_POPUP_USER_DETAIL_CLASS,
  USER_DETAILS_VALUES_BY_BTN_ID,
  EMOJI_NAMES,
  EMPTY_FILMS_LIST_MESSAGES,
  FILMS_SORTING_HASHES,
  FILMS_FILTER_HASHES,
  UPDATING_COMMENT_DELAY,
  FILM_FILTER_ELEMENTS,
  FILM_SORTING_ELEMENTS,
  LOADING_MESSAGE,
  FILM_MODEL_ACTIONS,
  METHODS,
  API_URL,
  AUTHORIZATION,
  END_POINT,
  COMMENTS_MODEL_ACTIONS,
  DELETE_BUTTON_TEXT,
  USER_TITLE,
  FILMS_FILTER_ACTIONS
};
