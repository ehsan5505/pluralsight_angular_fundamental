var app = angular.module("computersolution",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
    .when('/main',{
        templateUrl: 'public/main.html',
        controller: 'MainCntr'
    })
    .when('/service',{
        templateUrl: 'public/service.html',
        controller: 'ServiceCntr'
    })
    .when('/contact',{
        templateUrl: 'public/contact.html',
        controller: 'ContactCntr'
    })
    .when('/about',{
        templateUrl: 'public/about.html',
        controller: 'MainCntr'
    })
    .when('/table',{
        templateUrl: 'public/table.html',
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

app.controller('ServiceCntr',['$scope','$http',function($scope,$http){
    // console.log("This is working");
    $http.get("data/service.json").success(function(data){
        $scope.services = data;
    }).error(function(err){
        console.log("error:".err);
    }).catch(function(resp){
        console.log("catch:".resp);
    }).finally(function(){
        console("atleast this should work");
    });
}]);

app.controller('ContactCntr',['$scope','$http',function($scope,$http){
    $http.get("data/contact.json").success(function(data){
        $scope.contacts = data;
    })
}]);