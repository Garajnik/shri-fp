import Api from '../tools/api';
import * as R from 'ramda';

const api = new Api();

const isValid = R.allPass([
  R.pipe(R.length, R.gt(R.__, 2)),
  R.pipe(R.length, R.lt(R.__, 10)),
  R.pipe(Number, R.gt(R.__, 0)),
  R.test(/^[0-9.]+$/),
]);

const roundNum = x => Promise.resolve(Math.round(Number(x)));
const log = writeLog => x => { writeLog(x); return Promise.resolve(x); };

const toBinary = num =>
  api.get('https://api.tech/numbers/base', { number: num, from: 10, to: 2 })
    .then(R.prop('result'));

const lengthOf = s => Promise.resolve(String(s).length);
const square = x => Promise.resolve(x * x);
const mod3 = x => Promise.resolve(x % 3);
const getAnimal = id =>
  api.get(`https://animals.tech/${id}`)
    .then(R.prop('result'));

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  writeLog(value);

  if (!isValid(value)) {
    handleError('Ошибка валидации');
    return;
  }

  roundNum(value)
    .then(log(writeLog))
    .then(toBinary).then(log(writeLog))
    .then(lengthOf).then(log(writeLog))
    .then(square).then(log(writeLog))
    .then(mod3).then(log(writeLog))
    .then(getAnimal)
    .then(handleSuccess)
    .catch(() => handleError('Ошибка валидации'));
};

export default processSequence;
