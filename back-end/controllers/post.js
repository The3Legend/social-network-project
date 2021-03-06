const Post = require("../models/Post");
const User = require("../models/User");
const errorHendler = require("../utils/errorHendler");

module.exports.getAll = async function (req, res) {
  try {
    let posts = await Post.find();
    //Шукаємо всі пости користувачів
    res.json(posts);
  } catch (e) {
    errorHendler(res, e);
  }
};
module.exports.singlPost = async function (req, res) {
  try {
    let posts = await Post.find({ user: req.user.id });
    //Шукаємо пости окремого користувача по id
    res.json(posts);
  } catch (e) {
    errorHendler(res, e);
  }
};
module.exports.create = async function (req, res) {
  const { title, text } = req.body;
  try {
    let user = await User.findById(req.user.id);
    const newPost = await new Post({
      title: title,
      text: text,
      user: req.user.id,
      nickName: user.nickName,
      email:user.email
    }).save();
    //Створення поста з id залогіненого користувача
    res.status(201).json(newPost);
  } catch (e) {
    errorHendler(res, e);
  }
};
module.exports.delete = async function (req, res) {
  try {
    await Post.remove({ _id: req.params.id });
    res.status(200).json({
      massage: "The position has been deleted",
    });
    //видалення поста по id поста
  } catch (e) {
    errorHendler(res, e);
  }
};
module.exports.update = async function (req, res) {
  try {
    const udatePost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    //Функція зміни поста користувача
    res.status(200).json(udatePost);
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.comment = async function (req, res) {
  const { textOfTheComment } = req.body;
  try {
    const post = await Post.findById(req.params.post_id);
    let user = await User.findById(req.user.id);
    let newComment = {
      textOfTheComment,
      nickName: user.nickName,
    };
    post.comments.push(newComment);
    await post.save();
//Шукаємо id поста і id користувача,на основі цього створюємо комент до окремого поста
    res.json(post);
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.deleteComent = async function (req, res) {
  try {
    let post = await Post.findById(req.params.post_id);
    const removeCommentFromComments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.comment_id
    );
    post.comments = removeCommentFromComments;
    await post.save();
//видалення комента
    res.json(post);
  } catch (e) {
    errorHendler(res, e);
  }
};
