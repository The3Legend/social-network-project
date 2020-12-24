//index.js відповідає тільки за запуск сервера
const app = require("./app");

//Створюемо порт ми можем задавати значення порта через консоль
// або  не задано то 5000
const port = process.env.PORT || 5000;

// Запускаємо сервер
app.listen(port, () => console.log(`Server has been started on ${port}`));
