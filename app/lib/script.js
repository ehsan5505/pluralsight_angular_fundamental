var app = angular.module("computersolution",["ngRoute"]);

app.config(['$httpProvider','$routeProvider',function($httpProvider,$routeProvider){
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    $routeProvider
    .when('/main',{
        templateUrl: 'public/partial.html',
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
    .when('/show',{
        templateUrl: 'public/indix.html',
        controller: 'indixCntr'
    })
    .when('/indix',{
        
        templateUrl : 'public/search.html',
        controller :'searchCntr'
        
        // templateUrl:'public/indix.html',
        // controller: 'indixCntr'
    })
    .otherwise({
        redirectTo:'/main'
    });
}]);

app.controller("searchCntr",['$rootScope','$scope','$http',function($rootScope,$scope,$http){
    // if($scope.upc){
    
        $scope.searchByUPC = function(value){
            $scope.hideSearch = false;
            console.log("Implement by upc");
            $scope.upcNumber = value;
            $scope.show = "search "+value+" upc code";
            $scope.query = "https://api.indix.com/v2/summary/products?countryCode=US&upc="+value+"&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1";
            
            $http.get($scope.query).success(function(data){
                $scope.results = data;
                // $scope.stores = $scope.upcs.result.products;
                $scope.show = $scope.results;
            })
            
            // $scope.show = "Implement UPC";
            //$scope.query = "https://api.indix.com/v2/stores?q=Ingram%20Micro%20USA&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1";
        }
        $scope.searchByStore = function(value,num){
            $scope.hideSearch = true;
            console.log("Implement by Mfg");
            $scope.mfgNumber = num;
            $scope.show = "implement by manufacturer id";
            $scope.query = "https://api.indix.com/v2/stores?q="+value+"&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1";
            $http.get($scope.query).success(function(mfg){
                $scope.stores = mfg.result.stores;
                $scope.show = $scope.stores;
                
            });
            
            
        }
        
            
        $scope.searchByMfg = function(q,value){
            console.log("Implement by manufacturer");
            $scope.hideSearch = true;
            $scope.q = q;
            $scope.query = "https://api.indix.com/v2/brands?q="+value+"&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1";
            $http.get($scope.query).success(function(data){
                $scope.stores = data.result.brands;
                $scope.show = $scope.stores;
                console.log("SUCCESS!!!");
            })
            //$scope.show = "Search "+q+" from "+value;
        }
        
        
        $scope.searchByKEY = function(value){
            $scope.query = "https://api.indix.com/v2/summary/products?countryCode=US&q="+value+"&pageNumber=1&pageSize=10&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1";
            $http.get($scope.query).success(function(data){
                $scope.result = data.result;
                $scope.results = data;
                console.log(data);
            })
        }
        
        $scope.mfgRoute = function(mfgId,countryCode){
            // console.log("want to search "+$scope.mfgNumber+" for "+mfgId);
            
            $scope.hideSearch = false;
            if(countryCode != null){
                $scope.countryCode= countryCode;
                console.log("wanto to search "+$scope.mfgNumber+" for "+mfgId);
                query = "https://api.indix.com/v2/summary/products?countryCode="+countryCode+"&q="+$scope.mfgNumber+"&storeId="+mfgId+"&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1";
                $http.get(query).success(function(data){
                    $scope.results = data;
                    $rootScope.results = query;
                    console.log(data);                    
                })
            }else{
                $scope.show = "search from --  "+mfgId+" >>> "+$scope.q;
                $scope.query = "https://api.indix.com/v2/summary/products?countryCode=US&q="+$scope.q+"&brandId="+mfgId+"&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1";
                $http.get($scope.query).success(function(data){
                    $scope.results = data;
                });
            }
        }
        
        $scope.getProduct = function(data,countryCode){
            $rootScope.query = "https://api.indix.com/v2/summary/products/"+data+"?countryCode="+countryCode+"&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1";
            console.log($rootScope.query);
        }
}]);

app.controller('indixCntr',['$rootScope','$scope','$http',function($rootScope,$scope,$http){
    
        console.log($rootScope.query);
    
        // query = $rootScope.results;
    // $http.get(query).success(function(data){
        // $http.get("https://api.indix.com/v2/catalogStandard/products/d798604eef9fc122a4654a4e6f2f9e31?countryCode=US&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1").success(function(data2){
        
        $http.get($rootScope.query).success(function(data){
            // $scope.viewData = data;
            $scope.indix = data;
            $scope.product = $scope.indix.result.product;
            // mpid = $scope.indix.product.mpid;
            mpid = $scope.indix.result.product.mpid;
            
            $scope.query = "https://api.indix.com/v2/catalogStandard/products/"+mpid+"?countryCode=US&app_id=6962a34c&app_key=f01c81c83039781ab934a7b47e48f7a1";        
            
            $http.get($scope.query).success(function(data2){
                
                $scope.detail = data2;
                $scope.productDetail = $scope.detail.result.product;
                $scope.attributes = $scope.detail.result.product.attributes;
                console.log($scope.productDetail);           
                
            })
                        
        // })

    });
    //console.log("this is working");
}])

app.controller('MainCntr',['$scope',function($scope){
    $scope.ehsan="IsoComputerSolutions";
    
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