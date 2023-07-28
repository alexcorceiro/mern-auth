const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const userRoute = require("./routes/usersRoute")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);


mongoose.connect('mongodb://127.0.0.1:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch((err) => console.log('Erreur de connexion à la base de données', err));

app.use("/user", userRoute)

app.listen(4000, () => {
    console.log("server demarer")
})