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

const cms = document.querySelector("#cms-open");
const cmsVariants =document.querySelector(".hidden-cms-variants");
const cmsSelect = cmsVariants.querySelector(".main-controls__input");

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
  wordPressPercent: 0,
   

  init: function() {
    this.addTitle();
    cms.addEventListener("click", this.openCms.bind(this));
    startBtn.addEventListener("click", this.checkSelectedScreens.bind(this));
    buttonPlus.addEventListener("click", this.addScreenBlock.bind(this));
    this.getRollBack();
    resetBtn.addEventListener("click", this.reset.bind(this));
  },

  checkSelectedScreens: function () {

    if (this.addScreens() !== true) {
      alert("Заполните все поля в разделе 'Расчет по типу экрана'.");
    } else {
      this.start();
    }
  },

  addTitle: function() {
    document.title = title.textContent;
  },

  start: function() {
    this.addServices();
    this.addScreens();
    this.checkInputs();
    this.addPrices();

    //this.logger();
    this.showResult();    
    this.disabledInput();
    this.getTotalCountRollbackValue();
  },

  getTotalCountRollbackValue: function() {
    inputRange.addEventListener("input", event => {
      totalCountRollback.value = Math.ceil(this.fullPrice - (this.fullPrice * (event.target.value/100)));
    });
  },

  showResult: function() {
    total.value = this.screenPrice;
    totalCount.value = this.numberScreens;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },

  addScreens: function() {
    this.screens.length = 0;
    screens = document.querySelectorAll(".screen");

    screens.forEach( (screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value
      });

    });

    if(this.screens.find(item => item.price === 0)) {
      return false;
    } else {
      return true;
    }
  },

  addServices: function() {
    otherItemsPercent.forEach( item => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if(check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach( item => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if(check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });

  },

  addScreenBlock: function() {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    console.log(cloneScreen);
  },

  addPrices: function() {

    this.screenPrice = this.screens.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);

    for(let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for(let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key]/100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent + 
    (((this.screenPrice + this.servicePricesNumber + this.servicePricesPercent) * this.wordPressPercent) / 100);

    this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollBack/100)));

    console.log(this.numberScreens);

  },

  checkInputs: function() {
    this.numberScreens = this.screens.reduce( (acc, item) => {
      return acc + item.count;
    }, 0);
  },

  getRollBack: function() {
    inputRange.addEventListener("input", event => {
      inputRangeValue.textContent = event.target.value + "%";
      this.rollBack = event.target.value;
    });
  },

  

  logger: function() {
    //for (let key in appData) {
    //  console.log(key + " : " + appData[key]);
    //}
  },

  openCms: function() {
    if (cms.checked) {
      cmsVariants.style.display = "flex";

      const select = document.querySelector("#cms-select");
      const otherInput = document.querySelector("#cms-other-input");
      otherInput.value = "";

      select.addEventListener("change", event => {
        if (event.target.value == "other") {
          cmsSelect.style.display = "block";
          otherInput.addEventListener("input", (event) => {            
            this.wordPressPercent = event.target.value;
            console.log(event.target.value);
          });
          
          
        } else if (event.target.value == "50") {
          cmsSelect.style.display = "none";
          this.wordPressPercent = event.target.value;
        }
      });

    } else {
      cmsVariants.style.display = "none";
    }
  },

  reset: function() {
    this.removeScreenValue();
    this.removeElement();
    this.undisabledInput();
    this.cleanCheckbox();
    this.cleanInput(); 
    this.addScreen();   
  },

  undisabledInput: function () {
    
    const inputAll = document.querySelectorAll(".main-controls input");
    const selectAll = document.querySelectorAll("select");

    buttonPlus.disabled = false;

    inputAll.forEach( elem => {
      elem.disabled = false;
    });

    selectAll.forEach( elem => {
      elem.disabled = false;
    });

    inputRange.disabled = false;

    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    
  },
  
 removeScreenValue: function () {
    this.screens.length = 0;
    const screenBlock = document.querySelector(".screen");
    const select = screenBlock.querySelector("select");
    select.selectedIndex = 0;
    const input = screenBlock.querySelector("input");
    input.value = "";

 },
 removeElement: function () {
    let elems = document.querySelectorAll(".screen");
    for (let i = elems.length - 1; i > 0; i--) {
      elems[i].remove();
    }
  },

  disabledInput: function () {
    const inputAll = document.querySelectorAll(".main-controls input");
    const selectAll = document.querySelectorAll("select");

    buttonPlus.disabled = true;

    inputAll.forEach( elem => {
      elem.disabled = true;
    });

    selectAll.forEach( elem => {
      elem.disabled = true;
    });

    inputRange.disabled = false;

    startBtn.style.display = "none";
    resetBtn.style.display = "block";
  },

  cleanInput: function() {
    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;

    
    inputRangeValue.value = 0;
    inputRange.value = 0;
    inputRange.addEventListener("input", event => {
      totalCountRollback.value = 0;
    });
    totalCountRollback.value = 0;
    
    this.screenPrice = 0;
    this.rollBack =  0;
    this.adaptive =  true;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.numberScreens = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0; 
    this.wordPressPercent = 0;
    
       
  },

  cleanCheckbox: function() {
    otherItemsPercent.forEach( item => {
      const check = item.querySelector("input[type=checkbox]");
      
      if(check.checked) {
        check.checked = false;
      }
    });
    otherItemsNumber.forEach( item => {
      const check = item.querySelector("input[type=checkbox]");
      
      if(check.checked) {
         check.checked = false;
      }
    });

    cms.checked = false;
    cmsVariants.style.display = "none";
    cmsSelect.style.display = "none";
  },

  addScreen: function() {
    this.screens.length = 0;
    screens = document.querySelectorAll(".screen");

    screens.forEach( (screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value
      });

    });

      if(this.screens.find(item => item.price === 0)) {
        return false;
      } else {
        return true;
      }

  },
    
  };

appData.init();

