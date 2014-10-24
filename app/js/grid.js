var routeControllers = angular.module('routeControllers', []);

routeControllers.controller('GridController', ['$scope', '$http',
    function ($scope, $http) {
        var object = $http.get('js/data.json');

        object.success(function (data) {
            $scope.scopeRows =  data;
        });

}]);


routeControllers.directive('grid', function () {
    return {
        restrict: 'E', // used A because of attribute
        templateUrl: 'grid.html',
        transclude: true,
        scope: {
            title: "@",
            ngModel: '=',
            data:'='
        },
        controller: function($scope, $compile, $http) {
            // $scope is the appropriate scope for the directive
            $scope.reverseSort = false;
            var columns = [];
            $scope.columns=columns;
            this.addChild = function(column) { // this refers to the controller
                $scope.columns.push(column);
            };

            $scope.$watch('data', function(newValue, oldValue) {
                $scope.rows = filterByColumns(newValue, $scope.columns);
            });

            function filterByColumns(data, columns){
                return Enumerable.From(data).Select(
                    function(x) {
                        var row =[];
                        var tmp={};
                        columns.forEach(function(element, index){
                            tmp[element.value] = x.Value[element.value];

                            //row.push(x.Value[element.value]);
                        });
                        row.push(tmp);
                        return tmp;
                    }
                ).ToArray();
            }


        },
        link: function($scope, $element){
            $scope.isEnabled = true;
            $scope.sort = function(columnIndex){

                $scope.rows =  Enumerable.From($scope.rows).OrderBy(columnIndex).ToArray();
                console.log("sorting " + columnIndex);
            }
        }
    };
});


routeControllers.directive('column', function() {
    return {
        require: '^grid',
        scope: {
            name: '@',
            value: '@'
        },
        transclude: true,
        restrict: 'E',
        link: function(scope, elem, attrs, controllerInstance) {
            controllerInstance.addChild(scope);
        }
    };
});

