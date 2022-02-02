'use strict';

let title = prompt("Как называется Ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = +prompt("Сколько будет стоить данная работа?", "1200");
let rollBack = 10;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let fullPrice; 
let servicePercentPrice;
let allServicePrices;

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getAllServicePrices = function(sPrice1, sPrice2) {
  return sPrice1 + sPrice2;
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

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);


console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices());

