const express = require("express");
const router = express.Router();
const controller = require("../controllers/post");
//Підключення з папки controllers всі залежності
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  //до кожного запиту підключаємо passport
  controller.getAll
);
//Всі пости
router.get(
  "/singlPost",
  passport.authenticate("jwt", { session: false }),
  controller.singlPost
);
//Пост одного користувача
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.create
);
//Створення поста
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.delete
);
//Видалення поста
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.update
);
//Зміна поста
router.put(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  controller.comment
);
//Створення комента
router.delete(
  "/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  controller.deleteComent
);
//Видалення комента

module.exports = router;
