
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , schema = require('./schema');

var app = module.exports = express.createServer();

var dbUrl = 'mongodb://localhost/local';

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use('/bb-tasks',express.static(__dirname + '/backbone'));
  app.use('/ng-tasks',express.static(__dirname + '/angular'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  schema.connect('mongodb://localhost/local');
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.configure('test', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  schema.connect('mongodb://localhost/test');
})



// API Routes

app.get('/api', routes.index);

app.post('/api/tasks',function(req,res){
  var task = new schema.Task();
    task.name = req.body.name;
    task.trail = req.body.trail;
    task.save(function(err,task){
      if (!err){
         return res.send(task);
      } else{
         return res.status(500).send(err);
      }
      
    })
})

app.get('/api/tasks',function (req,res){
   return schema.Task.find(function (err,tasks){
      if (!err){
         return res.send(tasks);
      } else {
         return res.status(500).send(err);
      }
   })
})

app.put('/api/tasks/:id',function (req,res){
  return schema.Task.findById(req.params.id,function (err,task){
    task.name = req.body.name;
    task.trail = req.body.trail;
    task.save(function(err,task){
    if (!err){
      return res.send(task);
    } else{
      return res.status(500).send(err);
    }})
  })
})

app.get('/api/types', function (req,res){
   return schema.taskTypes;
})