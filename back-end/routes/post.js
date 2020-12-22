const express = require("express");
const router = express.Router();
const controller = require("../controllers/post");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getAll
);
router.get(
  "/singlPost",
  passport.authenticate("jwt", { session: false }),
  controller.singlPost
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.create
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.delete
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.update
);
router.put(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  controller.comment
);
router.delete(
  "/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  controller.deleteComent
);

module.exports = router;
