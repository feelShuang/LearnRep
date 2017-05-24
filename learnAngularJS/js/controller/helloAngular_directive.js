angular.module('myApp', [])
.run(function($rootScope) {
	// 使用.run访问$rootScope
	$rootScope.rootProperty = 'root scope';
})
.controller('ParentController', function($scope){
	
})