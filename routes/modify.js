const redis = require('redis');
const express = require('express');
const router = express.Router();

let client = redis.createClient();

//redis client
client.on('connect',function(){
  console.log("Connected to redis...on modify route");
});

router.get('/add', function(req, res, next){
  res.render('add',{title: 'Homework Reminder',subtitle: 'Add an Assignment'});
});

router.get('/edit', function(req, res, next) {
  res.render('edit');
});


/*post assignment*/
router.post('/search',function (req, res, next){
    let id = req.body.searchbox;
    client.hgetall(id,function(err,obj){
      console.log(obj);
        if(!obj){
            res.render('error',{
                error: 'Assignment does not exist'
            });
        }
        else{
            obj.id = id;
            res.render('assignment',{
                assignment:obj
            });
        }
    })
});

router.post('/delsearch',function (req, res, next){
    let id = req.body.searchbox;
    client.hgetall(id,function(err,obj){
      console.log(obj);
        if(!obj){
            res.render('error',{
                error: 'Assignment does not exist'
            });
        }
        else{
            obj.id = id;
            res.render('delassignment',{
                assignment:obj
            });
        }
    })
});

router.put('/edit', function(req, res, next){
  let assignmentid = 'assignment'+req.body.id;
  let period = req.body.period;
  let teacher = req.body.teacher;
  let assignment = req.body.assignment;
  let date = req.body.date;

  client.hmset(assignmentid, [
    'period', period,
    'teacher',  teacher,
    'assignment', assignment,
    'date', date
  ],function(err,reply){
    if(err){
      console.log(err);
    }
    else {
      console.log(reply);
      res.redirect('/users/home')
    }
  }
);
});

router.post('/add', function(req, res, next){
  let assignmentid = 'assignment'+req.body.id;
  let period = req.body.period;
  let teacher = req.body.teacher;
  let assignment = req.body.assignment;
  let date = req.body.date;

  client.hmset(assignmentid, [
    'period', period,
    'teacher',  teacher,
    'assignment', assignment,
    'date', date
  ],function(err,reply){
    if(err){
      console.log(err);
    }
    else {
      console.log(reply);
      res.redirect('/users/home')
    }
  }
);
});

router.get('/del', function(req, res, next){
  res.render('del',{title: 'Homework Reminder',subtitle: 'Delete an Assignment'});
});

router.delete('/del/:id',function(req,res,next){
  client.del(req.params.id);
  res.redirect('/users/home')
});

module.exports = router;
