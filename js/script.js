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
  rollBack: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  numberScreens: 0,
  fullPrice: 0,  
  servicePercentPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,

  init: function() {
    appData.addTitle();    
    startBtn.addEventListener("click", appData.checkSelectedScreens);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
    appData.getRollBack();
       
  },

  checkSelectedScreens: function () {

    if (appData.addScreens() !== true) {
       alert("Заполните все поля в разделе 'Расчет по типу экрана'.");
    } else {     
      appData.start(); 
    }
  },

  addTitle: function() {
    document.title = title.textContent;
  },

  start: function() {  
    appData.addServices();
    appData.addScreens();
    appData.checkInputs();
    appData.addPrices();    
    
    //appData.logger();     
    appData.showResult();
    appData.getTotalCountRollbackValue();
  },

  getTotalCountRollbackValue: function() {
    inputRange.addEventListener("input", function (event) {
    totalCountRollback.value = Math.ceil(appData.fullPrice - (appData.fullPrice * (event.target.value/100)));    
    });
  },

  showResult: function() {
    total.value = appData.screenPrice;
    totalCount.value = appData.numberScreens;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;  
    totalCountRollback.value = appData.servicePercentPrice;    
  },

  addScreens: function() {
    appData.screens.length = 0;
    screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index, 
        name: selectName, 
        count: +input.value,
        price: +select.value * +input.value
        
      });
        
    });

    console.log(appData.screens);

    if(appData.screens.find(item => item.price === 0)) {
      return false;
    } else {
      return true;
    }
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

    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollBack/100)));

    console.log(appData.numberScreens);
    
  },

  checkInputs: function() {
    appData.numberScreens = appData.screens.reduce(function(acc, item) { 
      return acc + item.count;
     }, 0);
  },

  getRollBack: function() {    
    inputRange.addEventListener("input", function(event) { 
    inputRangeValue.textContent = event.target.value + "%";
    appData.rollBack = event.target.value;  
        
    });
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
