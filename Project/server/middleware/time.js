//Trigger function
const redis = require('redis');
const client = redis.createClient();

client
  .connect()
  .then(async (res) => {
    
    var time = Math.floor(Date.now() / 1000)
    var jwt_expiration = 10000;
    let exp= time+jwt_expiration;
     var c=0
    function check(c){
    time+=jwt_expiration
    if(time==exp){
      c=0
      return c
    }
  }
  setTimeout(expired,jwt_expiration);
    function expired(){
      var c=1;
      let r=check(c)
      if(r==0){
        console.log("expired")
      }
      else{
          console.log("not expired")
      }
    }

   
  
  
    client.quit();
  })
  .catch((err) => {
    console.log('err happened' + err);});
