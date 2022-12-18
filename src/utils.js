import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

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
  const newHours = Math.trunc(minutes / 60);
  const newMinutes = minutes % 60;
  return (newHours !== 0) ? `${newHours}ч ${newMinutes}мин` : `${newMinutes}мин`;
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

export {
  getRandomArrayElement,
  humanizeDate,
  convertMinutesToHoursAndMinutes,
  transformFirstSymbolToUpperCase,
  getStringFromArray,
  limitTextLength,
  getSingularOrPluralForm
};
