var app = angular.module("computersolution",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
    .when('/main',{
        templateUrl: 'public/main.html',
        controller: 'MainCntr'
    })
    .otherwise({
        redirectTo:'/main'
    });
});

app.controller('MainCntr',['$scope',function($scope){
    $scope.ehsan="IsoComputerSolutions";
    console.log($scope);
}]);