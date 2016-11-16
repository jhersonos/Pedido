var app = angular.module("pedidoApp", []);
app.controller("pedidoCtrl", function($scope,$http) {

	$scope.restaurantes=[{}];
	$scope.locales=[{}];
	$scope.productos={};
	$scope.listap=[];
	var total=0;
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
					    // console.log($scope.productos)
					  }, function errorCallback(response) {
					    console.log(response)
					  });
				}else{

				}
			});
		},addProduct:function(){
			total=0;
			$("#list-product").html("");
			$("table tbody tr td input:checked").each(function(i, elem){
              var n = "#n"+this.id;
              var p = "#p"+this.id;
              var idcheck= parseInt(this.id);
              var nombre=$(n).val();//nombre del producto
              var precio = $(p).val();//precio del producto
              $("#list-product").append('<div class="item" id="item'+idcheck+'">'
              	+nombre+'<div class="right floated pointer" onclick="remove('+idcheck+')">x</div>'+						
						'<div class="right floated rigth-40">S/'+
						precio+'</div></div>');
              total = parseInt(total) + parseInt(precio);
              console.log(total)
          });
			$('#total').val(total)
		}
	}
	$scope.getRestaurantes.company();
});