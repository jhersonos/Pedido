var app = angular.module("pedidoApp", []);
app.controller("pedidoCtrl", function($scope,$http) {

	$scope.restaurantes=[{}];
	$scope.locales=[{}];
	$scope.productos={};
	$scope.listap={};
	$scope.getRestaurantes={
		company:function(){
			var url = "http://localhost:3000/company";
			$http({
			  method: 'GET',
			  url: url
			}).then(function successCallback(response) {
			    // console.log(response.data)
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
				    $scope.locales = response.data.headquarters;
				    	// console.log(response.data.headquarters)
				  }, function errorCallback(response) {
				    
				  });


			});
		},producto:function(){
			$('#local-list').on('change',function(){
				var companylist = $('#restaurant-list').val();
				var locallist = $('#local-list').val();
				if(companylist!="" && locallist!="") {
					var url = "http://127.0.0.1:3000/menu?company="+companylist+"&headquarter_id="+locallist;
					$http({
					  method: 'GET',
					  url: url
					}).then(function successCallback(response) {				    					    
					    $scope.productos=response.data[0].headquarters[0].menu;
					    $scope.listap = $scope.productos;
					    // console.log($scope.productos)
					  }, function errorCallback(response) {
					    console.log(response)
					  });
				}else{

				}
			});
		}
	}
	$scope.getRestaurantes.company();
});