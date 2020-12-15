const Post = require("../models/Post");
const User = require("../models/User");
const errorHendler = require("../utils/errorHendler");

module.exports.getAll = async function (req, res) {
  try {
    let posts = await Post.find();

    res.json(posts);
  } catch (e) {
    errorHendler(res, e);
  }
};
module.exports.create = async function (req, res) {
  const { title, text } = req.body;
  try {
    const newPost = await new Post({
      title: title,
      text: text,
      user: req.user.id,
    }).save();
    res.status(201).json(newPost);
  } catch (e) {
    errorHendler(res, e);
  }
};
module.exports.delete = async function (req, res) {
  try {
    await Post.remove({ _id: req.params.id });
    res.status(200).json({
      massage: "Позиція була видалена",
    });
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

    res.json(post);
  } catch (e) {
    errorHendler(res, e);
  }
};
