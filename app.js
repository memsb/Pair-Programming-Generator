// create angular app
var pairsGenerator = angular.module('pairsGenerator', []);

var people = new People();

// create angular controller
pairsGenerator.controller('mainController', function ($scope) {
    // function to submit the form after all validation has occurred
    $scope.submitForm = function () {
        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            people.addName($scope.userForm.name.$viewValue);
            $scope.user = {};
            $scope.userForm.$setPristine();
            $scope.names = people.getNames();
        }
    };
});

pairsGenerator.directive('unique', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (!people.exists(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('unique', true);
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('unique', false);
                }
                return viewValue;
            });
        }
    };
});

function People() {
    this.names = [];
}

People.prototype.addName = function (name) {
    this.names.push(name);
};

People.prototype.getNames = function () {
    return this.names;
};

People.prototype.exists = function (name) {
    return this.names.indexOf(name) !== -1;
};