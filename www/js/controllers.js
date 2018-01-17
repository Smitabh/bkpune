angular.module('bkpuneapp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope, $stateParams, $state,CenterSearchService) {
  // Called to navigate to the main app
  $scope.frcount="";
  $scope.ctcount="";
  $scope.Init = function() {

      ionic.Platform.ready(function(){
        $scope.headerImage = 'img/menu-bg.jpg';
          try{
            cordova.getAppVersion.getVersionNumber().then(function (version) {
                $('.version').text(version);
            }); 
          }catch(e){
            console.log(e);
          }
      });



      CenterSearchService.getCount().success(function(data) {
          console.log(data);
          var ct = data.split(",");

          $scope.frcount=ct[0];
          $scope.ctcount=ct[1];
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
          title: 'Fetch Failed',
          template: 'Please check your your internet connection!'
        });
      });

  }
  $scope.startApp = function() {
    $state.go('app.search');
    console.log('Starting!');
  };
  $scope.searchFR = function() {
    $state.go('app.frsearch');
    console.log('frsearch!');
  };

})

.controller('CenterCtrl', function($scope, $stateParams, $state,CenterSearchService,NgMap,$rootScope) {
  // Called to navigate to the main app
    $scope.center={};
    $scope.headerImage='';
    $scope.position={lat:null,lon:null};
    $scope.length='';
    $scope.Share = function(msg) {
      var options = {
        message: msg, // not supported on some apps (Facebook, Instagram)
        subject: 'Share Address', // fi. for email
        chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
      }

      var onSuccess = function(result) {
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
        console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      }

      var onError = function(msg) {
        console.log("Sharing failed with message: " + msg);
      }

      window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);      
    }



    $scope.Init = function() {
      var id = $stateParams.id;
      $scope.position = {lat:lat,lon:lon};

      CenterSearchService.getCenterDetails("ct",id).success(function(data) {
          console.log(data);
          $scope.center=data;
          try{
            $scope.headerImage = data.center_photos[0].path;
          }catch(e){
            $scope.headerImage = 'img/menu-bg.jpg';
          } 
                   
          console.log($scope.position);

        NgMap.getMap().then(function(map) {
          $rootScope.map = map;
          var total;
          //console.log(map.directionsRenderers[0].directions);
          //var myroute = map.directionsRenderers[0].directions.routes[0];
          //for (var i = 0; i < myroute.legs.length; i++) {
          //  total += myroute.legs[i].distance.value;
          //}
          //total = map.directionsRenderers[0].directions.routes[0].legs[0].distance.value / 1000;
          //$scope.length = total;
        });

        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
          title: 'Fetch Failed',
          template: 'Please check your your internet connection!'
        });
      });

    };

})

.controller('FranchiseCtrl', function($scope, $stateParams, $state,CenterSearchService) {
  // Called to navigate to the main app
    $scope.center={};
    $scope.Init = function() {
      var id = $stateParams.id;
      CenterSearchService.getCenterDetails("fr",id).success(function(data) {
          console.log(data);
          $scope.center=data;
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
          title: 'Fetch Failed',
          template: 'Please check your your internet connection!'
        });
      });

    };

})

.controller('AboutCtrl', function($scope) {


})

.controller('SearchCtrl', function($scope, $stateParams,CenterSearchService,$ionicPopup) {
  $scope.data = {city:'pune',area:''}
  $scope.input = {};  
  $scope.cities =[];
  $scope.areas =[];
  $scope.runinit = function(){

    CenterSearchService.getCities("ct").success(function(data) {
        console.log(data);
        //$scope.centers=data;
        $scope.cities = data
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
        title: 'Fetch Failed',
        template: 'Please check your your internet connection!'
      });
    });    
  }

  $scope.runinitk = function(){

    CenterSearchService.getCenters("ct","","").success(function(data) {
        console.log(data);
        //$scope.centers=data;
        $scope.centersk = data
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
        title: 'Fetch Failed',
        template: 'Please check your your internet connection!'
      });
    });    
  }

  $scope.cityUpdate = function(){
    console.log('in select');
    console.log($scope.cities.selectedItem.city);
    CenterSearchService.getArea("ct",$scope.cities.selectedItem.city).success(function(data) {
        console.log(data);
        //$scope.centers=data;
        $scope.areas = data
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
        title: 'Fetch Failed',
        template: 'Please check your your internet connection!'
      });
    });
  }

  $scope.FetchCenters = function(){
    console.log('in center');
    CenterSearchService.getCenters("ct",$scope.cities.selectedItem.city, $scope.areas.selectedItem.area).success(function(data) {
        console.log(data);
        $scope.centers=data;
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
        title: 'Fetch Failed',
        template: 'Please check your your internet connection!'
      });
    });
  }



})


.controller('frSearchCtrl', function($scope, $stateParams,CenterSearchService,$ionicPopup) {
  $scope.data = {city:'pune',area:''}
  $scope.input = {};  
  $scope.cities =[];
  $scope.areas =[];
  $scope.runinit = function(){

    CenterSearchService.getCities("fr").success(function(data) {
        console.log(data);
        //$scope.centers=data;
        $scope.cities = data
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
        title: 'Fetch Failed',
        template: 'Please check your your internet connection!'
      });
    });    
  }

  $scope.cityUpdate = function(){
    console.log('in select');
    console.log($scope.cities.selectedItem.city);
    CenterSearchService.getArea("fr",$scope.cities.selectedItem.city).success(function(data) {
        console.log(data);
        //$scope.centers=data;
        $scope.areas = data
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
        title: 'Fetch Failed',
        template: 'Please check your your internet connection!'
      });
    });
  }

  $scope.FetchCenters = function(){
    console.log('in center');
    CenterSearchService.getCenters("fr",$scope.cities.selectedItem.city, $scope.areas.selectedItem.area).success(function(data) {
        console.log(data);
        $scope.centers=data;
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
        title: 'Fetch Failed',
        template: 'Please check your your internet connection!'
      });
    });
  }



})
.controller('IntroCtrl', function($scope, $state) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('app.home');
    console.log('Starting!');
    // Set a flag that we finished the tutorial
    window.localStorage['didTutorial'] = true;
  };

  //No this is silly
  // Check if the user already did the tutorial and skip it if so
if(window.localStorage['didTutorial'] === "true") {
    console.log('Skip intro');
    $scope.startApp();
  }
  else{
  setTimeout(function () {
    //navigator.splashscreen.hide();
  }, 750);
  }
  

  // Move to the next slide
  $scope.next = function() {
    $scope.$broadcast('slideBox.nextSlide');
  };

  // Our initial right buttons
  var rightButtons = [
    {
      content: 'Next',
      type: 'button-positive button-clear',
      tap: function(e) {
        // Go to the next slide on tap
        $scope.next();
      }
    }
  ];
  
  // Our initial left buttons
  var leftButtons = [
    {
      content: 'Skip',
      type: 'button-positive button-clear',
      tap: function(e) {
        // Start the app on tap
        $scope.startApp();
      }
    }
  ];

  // Bind the left and right buttons to the scope
  $scope.leftButtons = leftButtons;
  $scope.rightButtons = rightButtons;


  // Called each time the slide changes
  $scope.slideChanged = function(index) {

    // Check if we should update the left buttons
    if(index > 0) {
      // If this is not the first slide, give it a back button
      $scope.leftButtons = [
        {
          content: 'Back',
          type: 'button-positive button-clear',
          tap: function(e) {
            // Move to the previous slide
            $scope.$broadcast('slideBox.prevSlide');
          }
        }
      ];
    } else {
      // This is the first slide, use the default left buttons
      $scope.leftButtons = leftButtons;
    }
    
    // If this is the last slide, set the right button to
    // move to the app
    if(index == 2) {
      $scope.rightButtons = [
        {
          content: 'Start using MyApp',
          type: 'button-positive button-clear',
          tap: function(e) {
            $scope.startApp();
          }
        }
      ];
    } else {
      // Otherwise, use the default buttons
      $scope.rightButtons = rightButtons;
    }
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
