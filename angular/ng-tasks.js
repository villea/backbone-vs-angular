
var app = angular.module('taskboard',[]);

app.directive('task', function (){
	return {
		restrict : 'E',
		templateUrl : 'task.html',
		link : function (scope,element){
			//console.log(scope.task)
		}
	}
})


app.controller('TasksCtrl', function($scope,$http){


    $scope.trails = ['inbox','in progress','done'];
    $scope.tasks = [];

    $http.get('/api/tasks').success(function (data){
      $scope.tasks = data;
    })

    $scope.addTask = function (task){
    	console.log(task.name);
    	task.trail = 'inbox';
    	$http.post('/api/tasks',task).success(function (data){
    		$scope.newtask.name = '';
    		$scope.tasks.push(data);
    	})
    }

   $scope.moveLeft = function (task){
     var trailIndex = $scope.trails.indexOf(task.trail);
     if (trailIndex > 0){
         trailIndex -= 1;
         task.trail = $scope.trails[trailIndex];
         $http.put('/api/tasks/'+task._id,task);
     }
   }

   $scope.moveRight = function (task){
     var trailIndex = $scope.trails.indexOf(task.trail);
     if (trailIndex < $scope.trails.length - 1){
     	trailIndex += 1;
     	task.trail = $scope.trails[trailIndex];
     	$http.put('/api/tasks/'+task._id,task);
     }
   }

   $scope.showLeftArrow = function (task){
   	  console.log($scope.trails.indexOf(task.trail) > 0)
   	  return $scope.trails.indexOf(task.trail) > 0;
   }

   $scope.showRightArrow = function (task){
   	  return $scope.trails.indexOf(task.trail) < $scope.trails.length - 1;
   }

})