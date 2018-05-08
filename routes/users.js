const redis = require('redis');
const express = require('express');
const router = express.Router();

let client = redis.createClient();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/home', function(req, res, next) {
  res.render('homepage',{subtitle: 'test'});
});

router.get('/displayAssignment/:id', function (req, res, next){
    let id = req.params.id;
    client.hgetall(id, function(err,obj){
        if(!obj){
            console.log(id);
            res.render('index',{
                error: 'Assignment does not exist',
            });
        }
        else{
            console.log(obj);
            obj.aid = req.body.id;
            res.render('assignment',{
                assignment:obj
            });
        }
    })
});

router.get('/all', function(req, res, next){
  client.keys('assignment*', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let assignmentlist = {};

            for(let d=0; d<data.length; d++){
                let item = "assignmentlist"+d;
                assignmentlist[item] = data[d];
            }
            res.render('allAssignments', assignmentlist);
            console.log(assignmentlist);
        }
  });
});
module.exports = router;
