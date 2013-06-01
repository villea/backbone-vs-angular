var schema = require('../schema');

exports.connect = function(url){
	schema.connect(url);
}


exports.create = function (req,res){
	var emp = new schema.Employee(req.body);
    emp.save(function(err,m){
      if (err){
   
      }
      return res.send(m);
    });
}

exports.list = function (req,res){
	res.json([{id:1,firstname:'Ville',surname:'Anttonen'}])
}

