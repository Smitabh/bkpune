// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var lat;
var lon;
angular.module('bkpuneapp', ['ionic', 'bkpuneapp.controllers','bkpuneapp.services','bkpuneapp.directives','ngMap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    try
    {
      if (cordova.platformId == 'android') {
          StatusBar.backgroundColorByHexString("#ffe065");
      }

      var onLocationSuccess = function(position) {
          console.log('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
          lat = position.coords.latitude;
          lon = position.coords.longitude;
      };
      function onLocationError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }
      navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);   
    }catch(e){
      console.log(e);
    }




    try
    {

      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      }

      window.plugins.OneSignal
        .startInit("f804aff1-ff72-421f-b55f-32b93662e8d7")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
        
    }catch(e){
      console.log(e);
    }

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
  .state('app.searchk', {
    url: '/searchk',
    views: {
      'menuContent': {
        templateUrl: 'templates/searchk.html',
        controller: 'SearchCtrl'
      }
    }
  })
  .state('app.frsearch', {
    url: '/frsearch',
    views: {
      'menuContent': {
        templateUrl: 'templates/frsearch.html',
        controller: 'frSearchCtrl'
      }
    }
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
  .state('app.center', {
      url: '/center/:id',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/center.html',
        controller: 'CenterCtrl'
        }
      }
    })

  .state('app.franchise', {
      url: '/franchise/:id',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/franchise.html',
        controller: 'FranchiseCtrl'
        }
      }
    })
  .state('app.about', {
      url: '/about',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
        }
      }
    })
  .state('app.contact', {
      url: '/contact',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html',
        controller: 'ContactCtrl'
        }
      }
    })
  .state('app.news', {
      url: '/news',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/news.html',
        controller: 'NewsCtrl'
        }
      }
    })
 .state('app.events', {
      url: '/events',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/events.html',
        controller: 'NewsCtrl'
        }
      }
    })
  /*
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });*/
  // if none of the above states are matched, use this as the fallback
  //$ionicConfigProvider.tabs.position('bottom');
  $urlRouterProvider.otherwise('/');
});

