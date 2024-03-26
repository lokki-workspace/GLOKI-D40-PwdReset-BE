import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dataBaseConnection } from "./database/dbConfig.js";
import { userSignup } from "./routes/userSignup.js";
import { userLogin } from "./routes/userLogin.js";
import { forgotPassword } from "./routes/forgotPassword.js";
import { resetPassword } from "./routes/resetPassword.js";
import { verifyRandomString } from "./routes/verifyRandomString.js";
import { apiConnected } from "./routes/apiconnect.js";
import { alluser } from "./routes/alluser.js";

//Configuring the environmental variable
dotenv.config();

//Server Setup
const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cors());

//Database Connection
dataBaseConnection();

//Routes
app.use("/", apiConnected);
app.use("/user/all", alluser);
app.use("/user/reset", resetPassword);
app.use("/user/verify", verifyRandomString);
app.use("/user/forgot", forgotPassword);
app.use("/user/login", userLogin);
app.use("/user/signin", userSignup);

//Listening the Server
app.listen(PORT, () => {
  console.log(`Server Started in http://localhost:${PORT}`);
});
