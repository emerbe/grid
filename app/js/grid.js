var routeControllers = angular.module('routeControllers', ['ui.bootstrap']);

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
            data:'=',
            style:'@',
            filterable:'='
        },
        controller: function($scope, $compile, $http) {
            // $scope is the appropriate scope for the directive
            $scope.reverseSort = false;
            $scope.orderByField = '';
            $scope.filters = {};
            $scope.filtersShow ={};
            var columns = [];
            $scope.columns=columns;
            this.addChild = function(column) { // this refers to the controller
                $scope.columns.push(column);
            };

            $scope.$watch('data', function(newValue, oldValue) {
                $scope.rows = filterByColumns(newValue, $scope.columns);
            });

            $scope.$watch('filtersShow', function(newValue, oldValue) {
                $.each(newValue, function(key,val){
                    if(val == false)
                        delete $scope.filters[key];
                });
            }, true);

            function filterByColumns(data, columns){
                return Enumerable.From(data).Select(
                    function(x) {
                        var row={};
                        columns.forEach(function(element, index){
                            row[element.value] = x.Value[element.value];
                        });
                        return row;
                    }
                ).ToArray();
            }

        },
        link: function($scope, $element){
            $scope.setOrderByField = function(sortField) {
                $scope.reverseSort = !$scope.reverseSort;
                $scope.orderByField = sortField;
            }

            $scope.getOrderValue = function(val) {
                return val[$scope.orderByField];
            }

            $scope.enableFilter = function(columnValue, enable){
                $scope.filtersShow[columnValue] = enable;
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

