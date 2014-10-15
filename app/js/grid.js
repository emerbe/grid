var routeControllers = angular.module('routeControllers', []);
routeControllers.controller('GridController', ['$scope', '$http', 
function($scope, $http) {
  function(sortPosition){
    $scope.sortPosition=sortPosition;
  }

}]);


routeControllers.directive('grid', function() {
  return {
    restrict    : 'E', // used A because of attribute
    templateUrl : 'grid.html',
    scope:{
        title: "@",
        columns: "=",
        data: "="
    }
  };
});

routeControllers.controller('dataController', ['$scope', '$http', 
function($scope, $http) {

    var object = $http.get('js/data.json');
    object.success(function(data){
      $scope.scopeColumns =data.columns;
      delete data.columns;
      $scope.scopeRows=data;
    });

}]);

routeControllers.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a - b;
    });
    return array;
 }
});