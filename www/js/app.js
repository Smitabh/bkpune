// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('bkpuneapp', ['ionic', 'bkpuneapp.controllers','bkpuneapp.services','bkpuneapp.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    try
    {
      if (cordova.platformId == 'android') {
          StatusBar.backgroundColorByHexString("#f97b88");
      }     
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
  $ionicConfigProvider.tabs.position('bottom');
  $urlRouterProvider.otherwise('/');
});

