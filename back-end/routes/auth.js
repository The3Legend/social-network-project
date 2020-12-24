const express = require("express");
//Підключаємо експресс
const { check } = require("express-validator");
//Провірка на валідність
const router = express.Router();
// сущність яка знаходиться в express це Router  це конструктор
const controller = require("../controllers/auth");
//Підключаємо контроллер це розбивка 2 частини функції,її можна було записати і тут
router.post(
  "/login",
  [
    check("email", "Уведіть коректний email!").normalizeEmail().isEmail(),
    check("password", "Уведіть пароль!").exists(),
  ],
  controller.login
);
// Після обєднання ми отримаємо Localhost:5000//api/auth/login
router.post(
  "/register",
  [
    check("email", "Некоректний email").isEmail(),
    check("password", "Мінімальна довжина пароля 6 символів").isLength({
      min: 6,
    }),
  ],
  controller.register
);
// Після обєднання ми отримаємо Localhost:5000//api/auth/register

module.exports = router;
//експортуємо його
