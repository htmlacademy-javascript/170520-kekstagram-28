"use strict";

/* Функция для проверки длины строки
 * Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
 * если строка меньше или равна указанной длине, и false, если строка длиннее
 * */

const isStringWithingMaxLength = function (string, maxLength) {
  return string.length <= maxLength;
};

// Cтрока короче 20 символов
console.log(
  isStringWithingMaxLength('проверяемая строка', 20)
)

// Длина строки ровно 18 символов
console.log(
  isStringWithingMaxLength('проверяемая строка', 18)
)

// Строка длиннее 10 символов
console.log(
  isStringWithingMaxLength('проверяемая строка', 10)
)
