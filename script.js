'use strict';

let title;
let screens;
let screenPrice;
let rollBack = 10;
let adaptive;
let service1;
let service2;
let fullPrice;
let servicePercentPrice;
let allServicePrices;

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
  title = prompt("Как называется Ваш проект?");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
  
  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));

  screenPrice = +screenPrice;

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getAllServicePrices = function() {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
    service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
    service2 = prompt("Какой дополнительный тип услуги нужен?");
    }
    let servicePrice;
    while (!isNumber(servicePrice)){
      servicePrice = prompt("Сколько это будет стоить?");
      servicePrice = +servicePrice;
    }
    sum += servicePrice;
    }
  return sum;
};

function getTitle() {
  title = title.trim();
  title = title[0].toUpperCase() + title.slice(1).toLowerCase();
}

const getServicePercentPrices = function() {
  return Math.ceil(fullPrice - (fullPrice * (rollBack/100)));
};

const showTypeOf = function(variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function(price) {
  if (price >= 30000) {
    return "Даём скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даём скидку в 5%";
  } else if (price < 15000 && price >= 0) {
    return "Скидка не предусмотрена";
  } else {
    return "Что-то пошло не так";
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices());

