var Task = Backbone.Model.extend({

  idAttribute: "_id",

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

var ShowTasksView = Backbone.View.extend({

    initialize : function (opts){
      this.listenTo(this.collection,"add change",this.render);
      this.trail = opts.trail;
      this.$el.empty();
    },

    template : _.template('<p><%= name %></p>'), 

    render : function (){
        this.$el.empty();
        console.log("render");
        var self = this;
        _.each(this.collection.filter(function (task){
          return task.get("trail") === self.trail;
        }), function (task){
          self.$el.append(self.template(task.toJSON()));
        })
        
    },

})