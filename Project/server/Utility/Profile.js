const express = require("express");
const executeQuery=require("../Database/executeQuery")
const jwt = require("jsonwebtoken");
var time = Math.floor(Date.now() / 1000)
var jwt_expiration = 60000*60;
let exp= time+jwt_expiration;
var ms = jwt_expiration;
var d = new Date(1000*Math.round(ms/1000)); // round to nearest second
function pad(i) { return ('0'+i).slice(-2); }
// to get the time to be displayed for expirationation of session
var expiresIn = d.getUTCHours() + ' h: ' + pad(d.getUTCMinutes()) + ' m: ' + pad(d.getUTCSeconds())+' s';
const router=express.Router();
const app = express();
const bcrypt = require("bcrypt");
const mysql=require("mysql");
const dbConfig = require("../Database/dbconfig.json");
app.use(express.json)
const db=mysql.createConnection(dbConfig)
module.exports = {Profile: async function(req,res){ 
    const username=req.body.username;
  const pass=req.body.pass;
  const email=req.body.email;
  let result = await executeQuery.executeQuery(
    `select username from users where username ='${username}'`
  );
  var mail=result[0].username
  if (result.length > 0) {
    res.json({
        time:time,jex:jwt_expiration,expiresIn:expiresIn,user:mail
    })
  }
},
};