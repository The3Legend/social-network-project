
const express = require("express");
// Підключення модуля express
const mongoose = require("mongoose");
//Підключення монгус
const passport = require("passport");
//Підключення паспорт
const bodyParser = require("body-parser");
//body-parser витягує всю частину тіла вхідного потоку запитів і надає його на req.body
const cors = require("cors");
const morgan = require("morgan");
const keys = require("./config/keys");
const postRouters = require("./routes/post");
const authRoutes = require("./routes/auth");
const app = express();

//Реєструємо роут з папки routes
app.use(express.json({extended:true}))
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  //Підключення до бази даних монго
  .then(() => console.log("MongoDB conected"))
  .catch((e) => console.log(e));

app.use(passport.initialize());
require("./middleware/passport")(passport);
//Підключаєм пасспорт

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/post", postRouters);
app.use("/api/auth", authRoutes);
// обєкт конструктор use,він буде зєднуватись з тим урл який є в роутах
// всі роути починаються з слова -api- і є отдільний роут auth
// 2 значенням передаємо значення authRoutes
// є строка "/api/auth" вона буде зєднуватись з login з файлу ./routes/auth

module.exports = app;

