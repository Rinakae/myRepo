let title = "my Project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 100;
let rollback = 10;
let fullPrice = 200;
let adaptive = true;

console.log(typeof title, typeof rollback, typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback/100));


alert("Привет!");

console.log("Ещё раз привет");