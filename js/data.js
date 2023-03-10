import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 1;
const COMMENTS_MAX = 3;

const descriptions = [
  'Крупный план нежного цветка с сложными лепестками в розовых и белых оттенках. Цветок на фоне затуманенной зеленой листвы, создающей сонный эффект.',
  'Живая городская улица в ночное время, полная неоновых огней и суеты людей. Отражения на мокром тротуаре придают сюрреалистический эффект сцене.',
  'Потрясающий вид на океан с бирюзовыми волнами, бьющимися о остроконечные скалы. Небо состоит из глубоких синих и оранжевых оттенков, когда солнце заходит за горизонт.',
  'Заснеженный зимний пейзаж с деревьями, покрытыми снегом, создающий мирную и спокойную атмосферу. Небо покрыто тучами и цвета приглушены, добавляя тишины и спокойствия сцене.',
  'Интригующая мозаика из красочных плиток, создающая яркий и сложный узор. Фотография сделана вблизи, подчеркивая тонкость деталей дизайна.',
  'Драматический черно-белый портрет лица, отображающий интенсивный взгляд и выраженные черты эмоций. Фото кадрировано таким образом, что подчеркивается взгляд человека, усиливая интенсивность изображения.',
];

const authors = [
  'Иван Грозный',
  'Илон Маск',
  'Джон Леннон',
  'Кекс',
  'Иван Васильевич Бунша',
  'Сальвадор Дали',
];

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


const photoIndexer = createIdGenerator();
const commentIndexer = createIdGenerator();

const createComment = () => {
  const index = commentIndexer(); // С каждым вызовом createComment() важно однократно вызвать commentIndexer(). Заодно и сохранить в переменную для дальнейшего, возможно многократного, использования.
  return {
    'id': index,
    'avatar': `img/avatar-${getRandomInteger(1, 6)}.svg`,
    'name': getRandomArrayElement(authors),
    'message': getRandomArrayElement(comments),
  };
};

const createPhoto = () => {
  const index = photoIndexer(); // С каждым вызовом createPhoto() важно однократно вызвать commentIndexer(). Заодно и сохранить в переменную для дальнейшего, возможно многократного, использования.
  return {
    'id': index,
    'url': `photos/${index + 1}.jpg`,
    'description': getRandomArrayElement(descriptions),
    'likes': getRandomInteger(LIKES_MIN, LIKES_MAX),
    'comments': Array.from({length: getRandomInteger(COMMENTS_MIN, COMMENTS_MAX)}, createComment),
  };
};

const createDataForGallery = (amount) => Array.from({length: amount}, createPhoto);

export {createDataForGallery};
