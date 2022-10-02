const express = require("express");
const router=express.Router();
const app = express();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const mysql=require("mysql");
const dbConfig = require("../Database/dbconfig.json");
const db=mysql.createConnection(dbConfig)
app.use(express.json)
module.exports = {signup: async function(req,res){ const username=req.body.username;
  const pass=req.body.pass;
  const email=req.body.email;
  db.query('INSERT INTO users (username, pass, email) VALUES (?,?,?)',[username,pass,email], (err,result)=> {
    if(err ){
        res.json({status:false,message:"Username and Email are present.Please Pick Someother"})
    }
    else{
        res.json({status:true,message:"success"})
    }
  })}}