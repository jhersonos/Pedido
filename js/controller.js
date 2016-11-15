var app = angular.module("pedidoApp", []);
app.controller("pedidoCtrl", function($scope,$http) {

	$scope.restaurantes={};
	$scope.locales={};
	$scope.getRestaurantes={
		company:function(){
			var url = "http://localhost:3000/company";
			$http({
			  method: 'GET',
			  url: url
			}).then(function successCallback(response) {
			    //console.log(response.data)
			    $scope.restaurantes = response.data;
			  }, function errorCallback(response) {
			    
			  });
		},local:function(){
			$("#restaurant-list").on('change',function(){
				var c = $('#restaurant-list').val();
				var url = "http://localhost:3000/headquarter?company="+c;

				$http({
				  method: 'GET',
				  url: url
				}).then(function successCallback(response) {				    
				    $scope.locales = response.data[0];
				    console.log($scope.locales.headquarters)
				  }, function errorCallback(response) {
				    
				  });


			});
		}
	}
	$scope.getRestaurantes.company();
});