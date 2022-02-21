'use strict';

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback [type=range]");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  rollBack: 10,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  fullPrice: 0,
  servicePercentPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,

  init: function() {
    appData.addTitle();    
    startBtn.addEventListener("click", appData.start);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
  },

  addTitle: function() {
    document.title = title.textContent;
  },

  start: function() {    
    appData.addScreens();
    appData.addServices();
    appData.addPrices();    
    
    //appData.getServicePercentPrices();
    
    //appData.logger();     
    appData.showResult();
  },

  showResult: function() {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;    
  },

  addScreens: function() {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index, 
        name: selectName, 
        price: +select.value * +input.value
      });

    });
    console.log(appData.screens);
  },

  addServices: function() {
    otherItemsPercent.forEach(function(item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if(check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function(item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if(check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
   
  },

  addScreenBlock: function() {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    console.log(cloneScreen);
  },
  
  addPrices: function() {
  
    appData.screenPrice = appData.screens.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.price;
    }, 0);

    for(let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for(let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key]/100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
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

appData.init();
