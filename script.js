'use strict';

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  rollBack: 10,
  adaptive: true,
  service1: "",
  service2: "",
  fullPrice: 0,
  servicePercentPrice: 0,
  allServicePrices: 0,
  
  asking: function() {
    appData.title = prompt("Как называется Ваш проект?", "Калькулятор верстки");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
      
    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

  getAllServicePrices: function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

      let price = 0;

      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }
        
      do {
        price = prompt("Сколько это будет стоить?");
      } while (!isNumber(price));
        sum += +price;
      }
      return sum;
  },

  getFullPrice: function() {
    return +appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function() {
    return appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
  },

  getServicePercentPrices: function() {
    return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollBack/100)));
  },

  getRollbackMessage: function(price) {
    if (price >= 30000) {
      return "Даём скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даём скидку в 5%";
    } else if (price < 15000 && price >= 0) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },
  
  logger: function() {
    for (let key in appData) {
      console.log(key + " : " + appData[key]);
    }
    console.log();
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
  },

  start: function() {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    appData.logger();
  }
};

appData.start();



