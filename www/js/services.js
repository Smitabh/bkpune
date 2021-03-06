angular.module('bkpuneapp.services', [])


.service('CenterSearchService', function ($q, $http) {
    return {
  
    getCenters: function (type,city, area) {
      var deferred = $q.defer(),
                promise = deferred.promise;
                console.log(city);
//Ajax Starts
        $.ajax({
            url: "https://bkpuneapp.iocare.in/api/1/centers?c="+city+"&a="+area+"&type="+type,
            type: 'GET',
            data: '',
            beforeSend: function(xhr) { 
              //xhr.setRequestHeader("X-OCTOBER-REQUEST-HANDLER", "onCheckLogin");
              xhr = {};
              //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            }
          })
        .done(function(response) { 
          console.log(response);
          deferred.resolve(response);
        })
        .fail(function(response) {
          console.log("in error ");
          console.log(response);
          deferred.reject(response);
        });
      //ajax Ends
 
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;

      },

    getCities: function (type) {
      var deferred = $q.defer(),
                promise = deferred.promise;

//Ajax Starts
        $.ajax({
            url: "https://bkpuneapp.iocare.in/api/1/cities?type="+type,
            type: 'GET',
            data: '',
            beforeSend: function(xhr) { 
              //xhr.setRequestHeader("X-OCTOBER-REQUEST-HANDLER", "onCheckLogin");
              xhr = {};
              //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            }
          })
        .done(function(response) { 
          console.log(response);
          deferred.resolve(response);
        })
        .fail(function(response) {
          console.log("in error ");
          console.log(response);
          deferred.reject(response);
        });
      //ajax Ends
 
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;

      },

    getArea: function (type,city) {
      var deferred = $q.defer(),
                promise = deferred.promise;

//Ajax Starts
        $.ajax({
            url: "https://bkpuneapp.iocare.in/api/1/area?c="+city+"&type="+type,
            type: 'GET',
            data: '',
            beforeSend: function(xhr) { 
              //xhr.setRequestHeader("X-OCTOBER-REQUEST-HANDLER", "onCheckLogin");
              xhr = {};
              //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            }
          })
        .done(function(response) { 
          console.log(response);
          deferred.resolve(response);
        })
        .fail(function(response) {
          console.log("in error ");
          console.log(response);
          deferred.reject(response);
        });
      //ajax Ends
 
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;

      },
    getCenterDetails: function (type,id) {
      var deferred = $q.defer(),
                promise = deferred.promise;

//Ajax Starts
        $.ajax({
            url: "https://bkpuneapp.iocare.in/api/1/center/"+id+"?type="+type,
            type: 'GET',
            data: '',
            beforeSend: function(xhr) { 
              //xhr.setRequestHeader("X-OCTOBER-REQUEST-HANDLER", "onCheckLogin");
              xhr = {};
              //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            }
          })
        .done(function(response) { 
          console.log(response);
          deferred.resolve(response);
        })
        .fail(function(response) {
          console.log("in error ");
          console.log(response);
          deferred.reject(response);
        });
      //ajax Ends
 
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;

      },
    getCount: function () {
      var deferred = $q.defer(),
                promise = deferred.promise;

//Ajax Starts
        $.ajax({
            url: "https://bkpuneapp.iocare.in/api/1/count",
            type: 'GET',
            data: '',
            beforeSend: function(xhr) { 
              //xhr.setRequestHeader("X-OCTOBER-REQUEST-HANDLER", "onCheckLogin");
              xhr = {};
              //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            }
          })
        .done(function(response) { 
          console.log(response);
          deferred.resolve(response);
        })
        .fail(function(response) {
          console.log("in error ");
          console.log(response);
          deferred.reject(response);
        });
      //ajax Ends
 
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;

      }



  };
});

