let title;
let screens;
let screenPrice;
let rollback;
let fullPrice;
let adaptive;

title = "my Project";
screens = "Простые, Сложные, Интерактивные";
screenPrice = 100;
rollback = 10;
fullPrice = 200;
adaptive = true;

console.log(typeof title, typeof rollback, typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback/100));

alert("Привет!");

console.log("Ещё раз привет");