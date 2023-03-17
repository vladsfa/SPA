(function() {
'use strict'

angular.module("Assignment1", [])
.controller('LunchChecker', lunchCheckerHandler)

lunchCheckerHandler.$inject = ["$scope"]
function lunchCheckerHandler($scope){

    $scope.checkLunch = _ => {
        const foods = $scope.foods;
        if (!foods){
            emptyCheckLunchHandler("message");
            return;
        }

        const ensureFoods = getEnsureFoods($scope.foods);
        if(ensureFoods.length <= 3){
            enoughCheckLunchHandler("message");
        }
        else{
            greatlyCheckLunchHandler("message");
        }
    }

    function emptyCheckLunchHandler(placeholder){
        $scope[placeholder] = "Please enter data first";
        setFailureStyle(placeholder);
    }

    function enoughCheckLunchHandler(placeholder){
        $scope[placeholder] = "Enjoy!";
        setSuccessStyle(placeholder);
    }

    function greatlyCheckLunchHandler(placeholder){
        $scope[placeholder] = "Too much!";
        setSuccessStyle(placeholder);
    }
    
    function getEnsureFoods(foods){
        return foods.split(',').filter(food => food.trim().length != 0);
    }

    function setFailureStyle(placeholder){
        $scope[`${placeholder}Color`] = "red";
        $scope[`${placeholder}Border`] = "1px solid red";
    }

    function setSuccessStyle(placeholder){
        $scope[`${placeholder}Color`] = "greed";
        $scope[`${placeholder}Border`] = "1px solid green";
    }
}

})();