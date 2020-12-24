//3
const bcrypt = require("bcryptjs");
// Шифрування пароля
const { validationResult } = require("express-validator");
//Провірка на валідність
const jwt = require("jsonwebtoken");
//Створення токену
const keys = require("../config/keys");
const User = require("../models/User");
const errorHendler = require("../utils/errorHendler");

module.exports.login = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Incorrect data for registration",
    });
  }
  //Провірка на валідацію
  const { email, password } = req.body;
  const candidate = await User.findOne({ email: email });
  if (candidate) {
    // Провірка пороля,користувач існує
    const passwordRezult = bcrypt.compareSync(password, candidate.password);
    if (passwordRezult) {
      // ми маємо згенерувати токен,паролі співпали
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
          nickName: candidate.nickName,
        },
        //присвоюємо токену email,userId,nickName
        keys.jwt,
        { expiresIn: 60 * 60 }
      );
      // час існування токену
      res.status(200).json({
        token: `Bearer ${token}`,
        userId:`User ${candidate.id}`,
        message: "You are successfully logged in",
      });
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: "Passwords do not match, please try again",
      });
    }
  } else {
    // Користувача нема,Ошибка
    res.status(404).json({
      message: "User with this email cannot be found",
    });
  }
};

module.exports.register = async function (req, res) {
  // email,password
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Incorrect data for registration",
    });
  }
  const { email, nickName, password } = req.body;
  const candidate = await User.findOne({ email: email });
  let inaccessibleUserName = await User.findOne({
    nickName: nickName,
  });
  if (inaccessibleUserName)
  //Якщо користувач з таким nickName існує,ошибка
    return res
      .status(409)
      .json({ message: "Your nickName is already taken, try another one" });

  if (candidate) {
    //Користувач з таким імейл існує
    res.status(409).json({
      message: "This email is already taken, please try another",
    });
  } else {
    //Якщо все ок,створюємо користувача
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      email: email,
      password: bcrypt.hashSync(password, salt),
      nickName: nickName,
    });

    try {
      await user.save();
      res.status(201).json({ message: "User created!", user });
    } catch (e) {
      //Ошибка
      errorHendler(res, e);
    }
  }
};

// Експортуэмо 2 частини роута
