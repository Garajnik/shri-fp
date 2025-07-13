import * as R from 'ramda';

// Утилиты
const isColor = R.equals;
const notWhite = R.complement(isColor('white'));
const isNotRedOrWhite = R.both(R.complement(isColor('red')), R.complement(isColor('white')));

const getColors = R.values;

const countColor = color => R.pipe(getColors, R.filter(R.equals(color)), R.length);
const countGreen = countColor('green');
const countRed = countColor('red');
const countBlue = countColor('blue');
const countOrange = countColor('orange');

// Уникальные цвета (кроме белого)
const countByColor = R.countBy(R.identity);
const countWithoutWhite = R.pipe(getColors, R.reject(R.equals('white')));
const hasThreeSameNonWhite = R.pipe(
  countWithoutWhite,
  R.countBy(R.identity),
  R.values,
  R.any(R.gte(R.__, 3))
);

// Проверка цвета конкретной фигуры
const colorIs = R.propEq;
const sameColor = (a, b) => R.eqProps(a, b);
const sameNonWhiteColor = (a, b) =>
  R.allPass([sameColor(a, b), R.pipe(R.prop(a), notWhite)]);

export const validateFieldN1 = R.allPass([
  colorIs('star', 'red'),
  colorIs('square', 'green'),
  colorIs('triangle', 'white'),
  colorIs('circle', 'white'),
]);

export const validateFieldN2 = R.pipe(
  countGreen,
  R.gte(R.__, 2)
);

export const validateFieldN3 = R.converge(R.equals, [countRed, countBlue]);

export const validateFieldN4 = R.allPass([
  colorIs('circle', 'blue'),
  colorIs('star', 'red'),
  colorIs('square', 'orange'),
]);

export const validateFieldN5 = hasThreeSameNonWhite;

export const validateFieldN6 = R.allPass([
  R.pipe(countGreen, R.equals(2)),
  R.pipe(countRed, R.equals(1)),
  R.propEq('triangle', 'green'),
]);

export const validateFieldN7 = R.pipe(
  getColors,
  R.all(R.equals('orange'))
);

export const validateFieldN8 = R.pipe(
  R.prop('star'),
  isNotRedOrWhite
);

export const validateFieldN9 = R.pipe(
  getColors,
  R.all(R.equals('green'))
);

export const validateFieldN10 = sameNonWhiteColor('triangle', 'square');
