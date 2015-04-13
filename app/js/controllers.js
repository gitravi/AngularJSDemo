//'use strict';

/* Controllers */

var angularJsDemoApp = angular.module('AngularJsDemoApp', ['firebase', 'toaster']);

//Create Controller
angularJsDemoApp.controller('MainCtrl', function ($scope, $firebaseArray, toaster) {
    //new Note
    $scope.newToDoNote = {};
    $scope.newToDoNote.isDone = false;
    $scope.newToDoNote.noteText = '';
    $scope.newToDoNote.createdDate = moment().format('DD/MM/YYYY').toString();
    $scope.newToDoNote.inEditMode = false;
    $scope.isLoading = true;
    //Properties
    $scope.filter_ShowAll = false;
    $scope.showModalPopup = false;

    //Data References
    var myDataRef = new Firebase('https://amber-torch-288.firebaseio.com/ToDOApp');

    //Authentication and Authorization
    myDataRef.authAnonymously(function (error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            toaster.pop('success', "Authenticated successfully", "Authenticated successfully for user: " + authData.provider);
        }
        hideLoadingImg();
    }, { remember: "sessionOnly" });//Session Scope

    //Array to hold the notes
    $scope.toDoNotesList = $firebaseArray(myDataRef);
    $scope.safeApply = function (fn) {
        var phase = $scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            //if (fn && (typeof (fn) === 'function')) {
            //    fn();
            //}
        } else {
            $scope.$apply(fn);
        }
    };

    //Function to add a new note.
    $scope.addNote = function () {
        if ($scope.newToDoNote.noteText) {
            showLoadingImg();
            console.log($scope.newToDoNote);
            var clonedObj = $.extend(true, {}, $scope.newToDoNote);
            //$scope.toDoNotesList.push(clonedObj);
            myDataRef.push(clonedObj, $scope.hideLoadingImg);
            toaster.pop('success', "", "New Note Added successfully!");
            $scope.newToDoNote.noteText = '';
        } else {
            hideLoadingImg();
        }
    }

    function hideLoadingImg() {
        $scope.safeApply(function () {
            $scope.isLoading = false;
        });
        console.log("isLoading done!");
    }
    function showLoadingImg() {
        $scope.safeApply(function () {
            $scope.isLoading = true;
        });
        console.log("isLoading Started!");
    }

    $scope.toDoNotesList.editNote = function (data) {
        console.log(data);
        data.inEditMode = true;
        hideLoadingImg();
        //$scope.isLoading = false;
        //$scope.$apply();
    }

    $scope.toDoNotesList.updateNote = function (data) {
        console.log(data);
        showLoadingImg();
        data.inEditMode = false;
        if ($scope.toDoNotesList)
            $scope.toDoNotesList.$save(data, $scope.hideLoadingImg);
        toaster.pop('success', "", "Note Updated!");
    }

    $scope.toDoNotesList.removeNote = function (data) {
        console.log(data);
        showLoadingImg();
        data.inEditMode = false;
        if ($scope.toDoNotesList)
            $scope.toDoNotesList.$remove(data, $scope.hideLoadingImg);
        toaster.pop('info', "", "Note Removed!");
    }
});