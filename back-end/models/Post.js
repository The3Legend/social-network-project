const mongoose = require("mongoose");
let postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
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
