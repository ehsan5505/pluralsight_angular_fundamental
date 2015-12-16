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
    .otherwise({
        redirectTo:'/main'
    });
});

app.controller('MainCntr',['$scope',function($scope){
    $scope.ehsan="IsoComputerSolutions";
    console.log($scope);
}]);

app.controller('ServiceCntr',['$scope','$http',function($scope,$http){
     
}]);

app.controller('ContactCntr',['$scope','$http',function($scope,$http){
    
}])