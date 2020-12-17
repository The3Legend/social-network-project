//3
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");
const errorHendler = require("../utils/errorHendler");

module.exports.login = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Некоректні дані для реєстрації",
    });
  }
  const { email, password } = req.body;
  const candidate = await User.findOne({ email: email });
  if (candidate) {
    // Проверка пароля,пользователь существует
    const passwordRezult = bcrypt.compareSync(password, candidate.password);
    if (passwordRezult) {
      // МИ МАЄМО згенерувати токен,пароли совпали
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
          nickName: candidate.nickName,
        },
        keys.jwt,
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: "Пароли не совпадают,попробуйте снова",
      });
    }
  } else {
    // Пользователя нет,Ошибка
    res.status(404).json({
      message: "Пользователь с таким імейл не найдень",
    });
  }
};

module.exports.register = async function (req, res) {
  // email,password
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Некоректні дані для реєстрації",
    });
  }
  const { email, nickName, password } = req.body;
  const candidate = await User.findOne({ email: email });
  let inaccessibleUserName = await User.findOne({
    nickName: nickName,
  });
  if (inaccessibleUserName)
    return res
      .status(409)
      .json({ message: "Ваш nickName уже занят попробуйте другой" });

  if (candidate) {
    // Пользователь существує треба вернути ошибку
    res.status(409).json({
      message: "Такой имейл уже занят.Попробуйте другой",
    });
  } else {
    // Створюємо пользователя
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      email: email,
      password: bcrypt.hashSync(password, salt),
      nickName: nickName,
    });

    try {
      await user.save();
      res.status(201).json({ message: "Пользователь создан", user });
    } catch (e) {
      // Обработать ошибку
      errorHendler(res, e);
    }
  }
};

// Експортуэмо 2 частини роута
