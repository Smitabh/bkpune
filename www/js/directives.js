angular.module('bkpuneapp.directives', [])  
.directive('fbImage', [function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.css({
            'background-image': 'url(' + attrs.fbImage +')',
            'background-size' : 'cover',
            'background-position': 'center',
            'margin': 'auto'
        });

      }
    };
  }]);