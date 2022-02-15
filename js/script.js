'use strict';

const title = document.getElementsByTagName("h1")[0];
const buttonCalc = document.getElementsByClassName("handler_btn")[0];
const buttonDump = document.getElementsByClassName("handler_btn")[1];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback [type=range]");
const spanRangeValeu = document.querySelector(".rollback .range-value");
const totalInputs = document.getElementsByClassName("total-input");
const totalInput = totalInputs[0];
const totalCount = totalInputs[1];
const totalCountOther = totalInputs[2];
const totaFullCount = totalInputs[3];
const totalCountRollback = totalInputs[4];

let screens = document.querySelectorAll(".screen");

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  rollBack: 10,
  adaptive: true,
  services: {},
  fullPrice: 0,
  servicePercentPrice: 0,
  allServicePrices: 0,

  start: function() {
    appData.asking();
    appData.addPrices();    
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },
  
  asking: function() {

    do {
      appData.title = prompt("Как называется Ваш проект?", "Калькулятор верстки");
    } while (isNumber(appData.title));
       
    for (let i = 0; i < 2; i++) {
    
      let name;
      let price = 0;
      
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (isNumber(name));

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!isNumber(price));

      appData.screens.push({id: 1, name: name, price: +price});

    }
    
    for (let i = 0; i < 2; i++) {
      
      let name;
      let price = 0;

      do {
        name = prompt("Какой дополнительный тип услуги нужен?") + i;
      } while (isNumber(name));
         
      do {
        price = prompt("Сколько это будет стоить?");
      } while (!isNumber(price));
      
      appData.services[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  addPrices: function() {
  
    appData.screenPrice = appData.screens.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.price;
    }, 0);

    for(let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function() {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function() {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
  },

  getServicePercentPrices: function() {
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollBack/100)));
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
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens); 
    console.log(appData.services);   
  }
};

appData.start();
