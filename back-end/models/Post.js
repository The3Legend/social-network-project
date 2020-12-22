const mongoose = require("mongoose");
let postSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  nickName: {
    type: String,
  },
  email: {
    type: String,
  },
  comments: [
    {
      user: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
      },
      textOfTheComment: {
        type: String,
      },
      nickName: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = postSchema = mongoose.model("posts", postSchema);
