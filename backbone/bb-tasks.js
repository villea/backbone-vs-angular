var Task = Backbone.Model.extend({

	defaults : {
		'trail' : 'inbox'
	},
	validate: function(attrs, options) {
       if (!attrs.name){
       	  return "Name is required";
       }
	}
});

var Tasks = Backbone.Collection.extend({
	model : Task,
	url : '/api/tasks'
})


var AddTaskView = Backbone.View.extend({

    el : '#add_task',

    events : {
      'click button' : 'add'
    },

    initialize : function(opts){
      this.render();
      this.$namefield = this.$('textarea[name=name]')
    },

    render : function(){
       
    },

    add : function (){
    	var task = new Task();
        task.set('name',this.$namefield.val())
    	this.collection.create(task);
    	this.$namefield.val('')
    }
    
})

