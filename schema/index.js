var mongoose = require("mongoose");

exports.connect = function(url){
	mongoose.connect(url);
}

var taskTypes = ["inbox","in progress","done"];

exports.Task= mongoose.model("Task",{
	name : {type :String,
		    required : true},
	trail : {type: String, 
		     enum : taskTypes,
		     required : true}
});

exports.taskTypes = taskTypes;