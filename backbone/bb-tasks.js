var Task = Backbone.Model.extend({

  idAttribute: "_id",

	defaults : {
		'trail' : 'inbox'
	},
	
  initialize : function (attrs,options){
     this.trails = ['inbox','in progress','done'];
     this.trail_index = this.trails.indexOf(this.get('trail'))
  },

  validate: function(attrs, options) {
       if (!attrs.name){
       	  return "Name is required";
       }
	},

  moveRight : function (){
    if (this.trail_index < this.trails.length - 1){
       this.trail_index += 1;
       this.set("trail",this.trails[this.trail_index]);
       this.save();
    }
  },
  moveLeft : function (){
    if (this.trail_index > 0){
       this.trail_index -= 1;
       this.set("trail",this.trails[this.trail_index]);
       this.save();
    }
 },
  isLeft : function (){
    return this.trail_index === 0;
  },
  isRight : function (){
    return this.trail_index === this.trails.length - 1;
  }

});

var Tasks = Backbone.Collection.extend({
	model : Task,
	url : '/api/tasks'
})


var AddTaskView = Backbone.View.extend({

    el : '#add_task',

    template : _.template($('#add_task_tmpl').html()),
    
    events : {
      'click button' : 'add'
    },

    initialize : function(opts){
      this.render();
      this.$namefield = this.$('textarea[name=name]')
    },


    render : function(){
      this.$el.append(this.template());
    },

    add : function (){
      var task = new Task();
      task.set('name',this.$namefield.val())
      console.log(this.$namefield.val())
    	this.collection.create(task,{wait: true});
    	this.$namefield.val('')
    }
    
})

var ShowTaskView = Backbone.View.extend({

  events : {
    'click .left' : 'moveLeft',
    'click .right' : 'moveRight'
  },

  template : _.template($('#task_tmpl').html()),

  initialize : function (opts){
  },

  render : function (){
    var data = this.model.toJSON();
    data.showLeftArrow = !this.model.isLeft();
    data.showRightArrow = !this.model.isRight();
    this.$el.html(this.template(data))
    return this;
  },

  moveLeft : function(){
    this.model.moveLeft();
  },

  moveRight : function(){
    this.model.moveRight();
  }

})

var ShowTasksView = Backbone.View.extend({

    initialize : function (opts){
      this.listenTo(this.collection,"add change",this.render);
      this.trail = opts.trail;
      this.$el.empty();
    },

    render : function (){
        this.$el.empty();
        var self = this;
        _.each(this.collection.filter(function (task){
          return task.get("trail") === self.trail;
        }), function (task){
          var showTaskView = new ShowTaskView({ model : task});
          self.$el.append(showTaskView.render().$el);
        })
        
    },

})