import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { DAYJS_DURATION_FORMAT, ESCAPE_KEYCODE } from './const';

function humanizeDate(date, format, fromNow) {
  dayjs.extend(relativeTime);

  switch (fromNow) {
    case true:
      return dayjs(date).fromNow(true);

    case false:
    default:
      return date ? dayjs(date).format(format) : '';
  }
}

function convertMinutesToHoursAndMinutes(minutes) {
  dayjs.extend(duration);

  const dayjsDurationFormat = (minutes >= 60) ? DAYJS_DURATION_FORMAT.full : DAYJS_DURATION_FORMAT.short;

  return dayjs.duration(minutes, 'minutes').format(dayjsDurationFormat);
}

function transformFirstSymbolToUpperCase(word) {
  return word ? word[0].toUpperCase() + word.slice(1) : '';
}

function getStringFromArray(array, splitter, cb) {
  const newArray = [];
  array.forEach((arrayItem) => {
    if (cb) {
      newArray.push(cb(arrayItem));
    } else {
      newArray.push(arrayItem);
    }

  });

  return newArray.join(splitter);
}

function limitTextLength(text, maxTextLength, finalSymbol = '...') {
  return (text.length > maxTextLength) ? text.substr(0, maxTextLength) + finalSymbol : text;
}

function getSingularOrPluralForm(formsArray, itemsQuantity) {
  let formIndex;

  if (itemsQuantity % 10 === 1 && itemsQuantity % 100 !== 11) {
    formIndex = 0;
  } else {
    formIndex = 1;
  }

  return formsArray[formIndex];
}

function isKeydownNotEscapeKey(evt) {
  return evt.type === 'keydown' && evt.keyCode !== ESCAPE_KEYCODE;
}

function clearChildElements(parentElement) {
  parentElement.replaceChildren();
}

function addClassToElement(element, className) {
  element.classList.add(className);
}

function removeClassFromElement(element, className) {
  element.classList.remove(className);
}

function removeClassFromChildrenElements(parentElement, className) {
  const childrenLinks = parentElement.querySelectorAll('a');
  childrenLinks.forEach((link) => {
    removeClassFromElement(link, className);
  });
}

function changeActiveLinkElementByClass(parentElement, linkElement, activeClass) {
  removeClassFromChildrenElements(parentElement, activeClass);
  addClassToElement(linkElement, activeClass);
}

function getHashFromLinkElement(linkElement) {
  return linkElement.hash.slice(1);
}

function getArrayAndObjectValueByPathFromString(nestedPath, nestedObject, separator = '.') {
  const properties = nestedPath.split(separator);
  return properties.reduce((previous, current) => previous?.[current], nestedObject);
}

function sortArrayByNestedObjectProperty(array, nestedPath, fromMaxToMin, cb) {
  return array.sort((a, b) => {
    a = getArrayAndObjectValueByPathFromString(nestedPath, a);
    b = getArrayAndObjectValueByPathFromString(nestedPath, b);

    if (cb) {
      a = cb(a);
      b = cb(b);
    }

    return fromMaxToMin ? b - a : a - b;
  });
}

function getDateObjectFromString(stringDate) {
  return new Date(stringDate);
}

function copyArrayAndLimitLength(array, min, max) {
  if (!max) {
    max = array.length;
  }

  return array.slice(min, max + 1);
}

function changeElementActivityByClass({ element, className, activityStatus }) {
  if (activityStatus) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

function getObjectKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export {
  humanizeDate,
  convertMinutesToHoursAndMinutes,
  transformFirstSymbolToUpperCase,
  getStringFromArray,
  limitTextLength,
  getSingularOrPluralForm,
  isKeydownNotEscapeKey,
  clearChildElements,
  changeActiveLinkElementByClass,
  getHashFromLinkElement,
  copyArrayAndLimitLength,
  sortArrayByNestedObjectProperty,
  getDateObjectFromString,
  changeElementActivityByClass,
  getObjectKeyByValue,
  removeClassFromChildrenElements
};
