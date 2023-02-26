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
 * Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево
 * @param string
 * @returns {boolean}
 */

const isPalindrome = function (string) {
  string = string.toLowerCase(); // Регистр на "палиндромность" не влияет
  string = string.replace(/\s/g, ""); // Удаляем whitespace символы регуляркой "\s" так как они не влияют на палиндромность. Флаг "g" означает global -- удаляем их все
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
