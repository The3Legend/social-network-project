//index.js відповідає тільки за запуск сервера
const app = require("./app");

//Створюем порт ми можем задавати значення порта через консоль
// або  не задано то 5000
const port = process.env.PORT || 5000;

// Запускаєм сервер
app.listen(port, () => console.log(`Server has been started on ${port}`));
