const executeQuery=require("../Database/executeQuery")
const jwt = require("jsonwebtoken");
const d = new Date();
let time = d.getTime();
const redis = require('redis');
const client = redis.createClient();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const mysql=require("mysql");
const CONSTANTS=require("../constants/constants");
const bodyparser = require("body-parser");
const express=require("express");
const { json } = require("body-parser");
const app = express();
const genToken = (username) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        data: {
          user: username,
        },
      },
      "secretKey",
      { expiresIn: "1h" },
      (err, encoded) => {
        if (err) {
          reject(CONSTANTS.JWT_ERR);
        }
        resolve(encoded);
      }
    );
  });
};
app.use(express.json)
module.exports = {Logout: async function(req,res){ 
    const username=req.body.username;
  let result = await executeQuery.executeQuery(
    `select * from users where username ='${username}'`
  );
  let utoken=1;
        let res_token = await genToken(username).catch((err) => err);
      if (res_token === CONSTANTS.JWT_ERR) {
        res.send(500);
      } else {  
        client
        .connect()
        .then(async (response) => {
         const value=client.del('token',res_token);
           const ctoken=client.del('ctoken',utoken);
           res_token ="";
           var flag= await client.set("d",0)
           var recreate= await client.get('d',flag)
            res.send({token:value,ctoken:ctoken,time:time,})
            
         
          client.quit();
        })
        .catch((err) => {
          console.log('err happened' + err);
        });
      }
      }
  
  }