var app = angular.module('SQLI', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/addPlanning", {
            templateUrl: "./addPlanning/addPlanning.html",
            controller: "addPlanning"
        })
        .when("/planning", {
            templateUrl: "./planning/planning.html",
            controller: "planning"
        }).when("/404", {
        templateUrl: "./../../errors/error-404.html",
    }).otherwise({
        redirectTo: '/addPlanning',
        controller: "addPlanning"
    });
});