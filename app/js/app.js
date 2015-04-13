var angularJsDemoApp = angular.module('AngularJsDemoApp', ['ngRoute', 'firebase', 'moment']);

//Config
angularJsDemoApp.config('$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/toDoNote.html',
        controller: 'MainCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});
//angularJsDemoApp.config('ngToastProvider', function (ngToastProvider) {
//    ngToastProvider.configure({
//        animation: 'slide',
//        horizontalPosition: 'right',
//        verticalPosition: 'top',
//        maxNumber: 10
//    });
//});