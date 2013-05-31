var mongoose = require("mongoose");

exports.connect = function(url){
	mongoose.connect(url);
}

var taskTypes = ["inbox","in progress","done"];

exports.Task= mongoose.model("Task",{
	name : String,
	trail : {type: String, enum : taskTypes}
});

exports.taskTypes = taskTypes;