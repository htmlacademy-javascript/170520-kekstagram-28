"use strict";

/**
 * Функция для проверки длины строки
 * Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
 * если строка меньше или равна указанной длине, и false, если строка длиннее
 * @param string
 * @param maxLength
 * @returns {boolean}
 */
const isStringWithingMaxLength = function (string, maxLength) {
  return string.length <= maxLength;
};


// Cтрока короче 20 символов (true)
console.log(
  isStringWithingMaxLength('проверяемая строка', 20)
)

// Длина строки ровно 18 символов (true)
console.log(
  isStringWithingMaxLength('проверяемая строка', 18)
)

// Строка длиннее 10 символов (false)
console.log(
  isStringWithingMaxLength('проверяемая строка', 10)
)



/**
 * Функция для проверки, является ли строка палиндромом.
 * Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
 * Регистр и whitespace-символы на палиндромность не влияют
 *
 * @param string
 * @returns {boolean}
 */

const isPalindrome = function (string) {
  string = string.toLowerCase(); // Регистр на "палиндромность" не влияет
  string = string.replace(/\s/g, ''); // Удаляем whitespace символы регуляркой "\s" так как они не влияют на палиндромность.
  return string === string.split('').reverse().join('');
};


// Строка является палиндромом (true)
console.log(
  isPalindrome('топот')
)

// Несмотря на разный регистр, тоже палиндром (true)
console.log(
  isPalindrome('ДовОд')
)

// Это не палиндром (false)
console.log(
  isPalindrome('Кекс')
)

// Это палиндром, несмотря на пробелы (true)
console.log(
  isPalindrome('Лёша на полке клопа нашёл ')
)





/**
 * Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает
 * их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.
 * В качестве аргумента принимаются и строки и числа. Последние всё-равно должны обрабатываться как строки.
 * @param string
 * @returns {number}
 */
const extractDigitsFromSting = function (string) {
  string = string.toString(); /* Если пришёл тип данных Number, всё-равно работаем с ним как с числом */
  string = string.replace(/[^0-9]/g, ''); /* Удаляем всё, что не цифры 0-9 */
  return (string.length === 0) ? NaN : +string; // Здесь аккуратней с условием, может быть просто нолик и он валиден
}

console.log(
  extractDigitsFromSting('2023 год')            // 2023
)
console.log(
  extractDigitsFromSting('ECMAScript 2022')     // 2022
)
console.log(
  extractDigitsFromSting('1 кефир, 0.5 батона') // 105
)
console.log(
  extractDigitsFromSting('агент 007')           // 7  /* TO DO: Вопрос! Почему обрезаются нолики в этом случае, но не обрезаются в случае "агент 1007", например */
)
console.log(
  extractDigitsFromSting('а я томат')           // NaN
)
console.log(
  extractDigitsFromSting(2023)        // 2023
)
console.log(
  extractDigitsFromSting(-1)          // 1
)
console.log(
  extractDigitsFromSting(1.5)         // 15
)


/*
Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
 */


const padStringBySubString = function (string, minLength, addition) {

  /* Если строка достаточно длинная, то не делаем ничего */
  if (string.length >= minLength) {
    return string;
  }

  /* Иначе считаем сколько символов надо добавить */
  const amountOfCharsToAdd = minLength - string.length;

  /* И готовимся сформировать добавочную строку */
  let stringOfCharsToAdd = '';

  /* Возможны два сценария: предоставлено достаточно символов, чтобы дополнить строку, или нет */

  /* 1) Если предоставлена достаточно большая строка-донор, то просто вырезаем из неё нужное количество символов */
  if (addition.length >= amountOfCharsToAdd) {
    stringOfCharsToAdd = addition.substring(0, amountOfCharsToAdd);
  }
  /* Иначе подачу символов из донора надо зациклить */
  else {
    stringOfCharsToAdd = addition.repeat(Math.floor(amountOfCharsToAdd / addition.length));
    
  }

  return stringOfCharsToAdd + string;
};

// Добавочный символ использован один раз (01)
// console.log(
//   padStringBySubString('1', 2, '0')
// )

// Добавочный символ использован три раза (0001)
// console.log(
//   padStringBySubString('1', 4, '0')
// )

// Добавочные символы обрезаны с конца (werq)
// console.log(
//   padStringBySubString('q', 4, 'werty')
// )

// Добавочные символы использованы полтора раза (wweq)
console.log(
  padStringBySubString('q', 4, 'we')
)

// Добавочные символы не использованы, исходная строка не изменена (qwerty)
// console.log(
//   padStringBySubString('qwerty', 4, '0')
// )
