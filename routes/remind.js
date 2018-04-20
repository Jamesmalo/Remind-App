const redis = require('redis');
const express = require('express');
const router = express.Router();

let client = redis.createClient();

//redis client
client.on('connect',function(){
  console.log("Connected to redis...on remind route");
});

//



module.exports = router;
