/* Функция для проверки длины строки
 * Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
 * если строка меньше или равна указанной длине, и false, если строка длиннее
 */
const isStringWithingMaxLength = (string, maxLength) => string.length <= maxLength;

/* Примеры и тесты */
/* eslint-disable */
console.log( isStringWithingMaxLength('проверяемая строка', 20) ); // Строка короче 20 символов (true)
console.log( isStringWithingMaxLength('проверяемая строка', 18) ); // Длина строки ровно 18 символов (true)
console.log( isStringWithingMaxLength('проверяемая строка', 10) ); // Строка длиннее 10 символов (false)
/* eslint-enable */


/* Функция для проверки, является ли строка палиндромом.
 * Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
 * Регистр и whitespace-символы на палиндромность не влияют
 */
const isPalindrome = (string) => {
  string = string.toLowerCase(); // Регистр на "палиндромность" не влияет
  string = string.replace(/\s/g, ''); // Удаляем whitespace символы регуляркой "\s" так как они не влияют на палиндромность.
  return string === string.split('').reverse().join('');
};

/* Примеры и тесты */
/* eslint-disable */
console.log( isPalindrome('топот') ); // Строка является палиндромом (true)
console.log( isPalindrome('ДовОд') ); // Несмотря на разный регистр, тоже палиндром (true)
console.log( isPalindrome('Кекс') ); // Это не палиндром (false)
console.log( isPalindrome('Лёша на полке клопа нашёл ') ); // Это палиндром, несмотря на пробелы (true)
/* eslint-enable */


/* Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их
 * в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.
 * В качестве аргумента принимаются и строки и числа. Последние всё-равно должны обрабатываться как строки.
 */
const extractDigitsFromSting = (string) => {
  string = string.toString(); /* Если пришёл тип данных Number, всё-равно работаем с ним как с числом */
  string = string.replace(/[^0-9]/g, ''); /* Удаляем всё, что не цифры 0-9 */
  return (string.length === 0) ? NaN : +string; // Здесь аккуратней с условием, может быть просто нолик и он валиден
};


/* Примеры и тесты */
/* eslint-disable */
console.log( extractDigitsFromSting('2023 год') ); // Ожидаемый результат: 2023
console.log( extractDigitsFromSting('ECMAScript 2022') ); // Ожидаемый результат: 2022
console.log( extractDigitsFromSting('1 кефир, 0.5 батона') ); // Ожидаемый результат: 105
console.log( extractDigitsFromSting('агент 007') ); // Ожидаемый результат: 7  /* TO DO: Вопрос! Почему обрезаются нолики в этом случае, но не обрезаются в случае "агент 1007", например */
console.log( extractDigitsFromSting('а я томат') ); // Ожидаемый результат: NaN
console.log( extractDigitsFromSting(2023) ); // Ожидаемый результат: 2023
console.log( extractDigitsFromSting(-1) ); // Ожидаемый результат: 1
console.log( extractDigitsFromSting(1.5) ); // Ожидаемый результат: 15
/* eslint-enable */


/* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку,
 * дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
 * Если исходная строка превышает заданную длину, она не должна обрезаться.
 * Если «добивка» слишком длинная, она обрезается с конца.
 */
const padStringBySubString = (string, targetLength, filler) => {

  // Если проброшенная строка уже достаточно длинная, то не делаем вообще ничего
  if (string.length >= targetLength) {
    return string;
  }

  // Иначе считаем сколько символов надо добавить
  let amountOfCharsToAdd = targetLength - string.length;

  // И готовимся сформировать добавочную строку
  let stringOfCharsToAdd = '';

  // Может быть так, что для достижения цели по символам не хватает всего пары штук. В таком случае одного добавления филлера (или даже его части) будет достаточно.
  // Но может быть и так, что прогнать филлер придётся многократно, чтобы дойти до этого состояния. Сначала это и делаем:
  stringOfCharsToAdd = filler.repeat(Math.floor(amountOfCharsToAdd / filler.length));

  // Заполнив основную массу пересчитываем сколь теперь осталось добавить символов
  amountOfCharsToAdd = targetLength - string.length - stringOfCharsToAdd.length;

  // Зная что одного филлера теперь уже точно будет достаточно добавляем нужную его часть. Причём добавляем начальную часть обрезав хвост.
  stringOfCharsToAdd = filler.substring(0, amountOfCharsToAdd) + stringOfCharsToAdd;

  return stringOfCharsToAdd + string;
};


/* Примеры и тесты */
/* eslint-disable */
console.log( padStringBySubString('1', 2, '0') ); // Добавочный символ использован один раз (01)
console.log( padStringBySubString('1', 4, '0') ); // Добавочный символ использован три раза (0001)
console.log( padStringBySubString('q', 4, 'werty') ); // Добавочные символы обрезаны с конца (werq)
console.log( padStringBySubString('q', 4, 'we') ); // Добавочные символы использованы полтора раза (wweq)
console.log( padStringBySubString('qwerty', 4, '0') ); // Добавочные символы не использованы, исходная строка не изменена (qwerty)
/* eslint-enable */


/* Генерируем случайное целое число из заданного диапазона */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


/* Получаем случайный элемент массива */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


/* Фабрика счётчиков: генерируем функции для создания независимых счётчиков (например фотки, комменты и т.д.)
 * https://up.htmlacademy.ru/javascript/28/module/4/item/10
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
 * https://up.htmlacademy.ru/javascript/28/demos/9873#7
 */
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => lastGeneratedId++;
};


/* Обработчики клавиатуры */

const isEscapeKey = (event) => event.key === 'Escape';


/* Есть ли в массиве дубликаты */
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}


export {getRandomInteger, getRandomArrayElement, createIdGenerator, isEscapeKey, hasDuplicates};

