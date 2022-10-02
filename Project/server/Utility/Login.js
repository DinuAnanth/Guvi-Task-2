const executeQuery=require("../Database/executeQuery")
var time = Math.floor(Date.now() / 1000)
const jwt = require("jsonwebtoken");
const redis = require('redis');
const client = redis.createClient();
const bcrypt = require("bcrypt");
const CONSTANTS=require("../constants/constants");
const express=require("express");
const app = express();
var jwt_expiration = 60000 * 60;
const saltRounds = 10;
const genToken = (username) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        data: {
          user: username,
        },
      },
      "secretKey",
      { expiresIn:"1h"},
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
module.exports = {
  Login: async function (req, res) {
    console.log("body", req.body);
    let username = req.body.username;
    let pass = req.body.pass;
    
    let exp= time+jwt_expiration;
    let result = await executeQuery.executeQuery(
      `select * from users where username ='${username}'`
    );
    if (result.length > 0) {
      let dbpassword=result[0].pass;
      
      if(dbpassword==pass){
        let utoken=1;
        let res_token = await genToken(username).catch((err) => err);
      if (res_token === CONSTANTS.JWT_ERR) {
        res.send(500);
      } else {  
        client
        .connect()
        .then(async (response) => {
          var flag= await client.set("d",0)
          var recreate= await client.get('d',flag)
          if(recreate==0){
            var flag= await client.set("d",1)
            var recreate= await client.get('d',flag)
            // Setex to store the key : value in redis 
           client.SETEX('token',3600,res_token)
          client.SETEX('ctoken',3600,JSON.stringify(utoken))
          }
          if(recreate==1){
           token = await client.get('token',res_token);
           ctoken= await client.get('ctoken',utoken);
        }
         
          res.json({
           token:token,ctoken:ctoken,jex:jwt_expiration,pass:pass
          })
          client.quit();
        })
        .catch((err) => {
          console.log('err happened' + err);
        });
      }
      }
      else{
        
        res.send("UserName / Passsword is Wrong");
      }
     
    } else {

      res.send("UserName / Passsword is Wrong");
    }
    
   
  },
};