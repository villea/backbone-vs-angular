

function TasksCtrl($scope,$http){


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

}