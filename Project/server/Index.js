const express = require("express");
const router=express.Router();
	
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const cors = require("cors");
const Login=require("./Utility/Login");
const Logout=require("./Utility/Logout")
const signup=require("./Utility/SignUp")
const verifyToken=require("./middleware/verifyToken");
const mysql = require("mysql2");
const bodyparser=require("body-parser");
const redis = require("redis");
const redisclient = redis.createClient();

(async () => {
	await redisclient.connect();
})();

console.log("Connecting to the Redis");

redisclient.on("ready", () => {
	console.log("Connected!");
});

redisclient.on("error", (err) => {
	console.log("Error in the Connection");
});

const app = express();
const dbConfig = require("./Database/dbconfig.json");
const { profile } = require("./Utility/Profile");
const Profile = require("./Utility/Profile");
const { Logut } = require("./Utility/Logout");
const db=mysql.createConnection(dbConfig)
app.use(express.json());
app.use(cors());
app.post("/verifyUsers",Login.Login)
app.use(bodyparser.urlencoded({extended : true}))
app.post("/insert",signup.signup)
app.post("/show",Login.Login)
app.post("/view",Profile.Profile)
app.post("/out",Logout.Logout)
app.listen(3001, () => {
  console.log("server started @3001");
});