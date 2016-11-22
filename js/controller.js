var app = angular.module("pedidoApp", []);
app.controller("pedidoCtrl", function($scope,$http) {

	$scope.restaurantes=[];
	$scope.locales=[];
	$scope.productos={};
	$scope.listap=[];
	$scope.object= {};
	$scope.direction={};
	$scope.destinoLatLng;
	var total=0;

	$scope.getRestaurantes={
		company:function(){//get list of restaurants
			var url = "http://localhost:3000/company";
			$http({
			  method: 'GET',
			  url: url
			}).then(function successCallback(response) {
			    // console.log(response.data)
			    $scope.restaurantes = response.data;
			    $("#restaurant-list").removeAttr('disabled')
			  }, function errorCallback(response) {
			    $("#restaurant-list").attr('disabled')
			  });
		},local:function(){//get list of locales
				var c = $('#restaurant-list').val();
				$('.pedido-box').attr('id','off')
				$('.pedido-box .center-box').attr('id','label-off')	
				if (c=="") {
					// console.log("Seleccione un restaurante")
				}else{
					var url = "http://localhost:3000/headquarter?company="+c;

					$http({
					  method: 'GET',
					  url: url
					}).then(function successCallback(response) {				    
					    $scope.locales = response.data.headquarters;
					    $('#local-list').removeAttr('disabled')
					    $scope.direction = $scope.locales;
					    // console.log($scope.direction[0].address)
					  }, function errorCallback(response) {
					    $('#local-list').attr('disabled')
					  });
				}
				

		},producto:function(){//get list of products
				var companylist = $('#restaurant-list').val();
				var locallist = $('#local-list').val();
				if(companylist!="" && locallist!="") {
					var url = "http://127.0.0.1:3000/menu?company="+companylist+"&headquarter_id="+locallist;
					$http({
					  method: 'GET',
					  url: url
					}).then(function successCallback(response) {				    					    
					    $scope.productos=response.data[0].headquarters[0].menu;
					    $scope.listap=$scope.productos;
					    $('.pedido-box').attr('id','on')//active modal
					    $('.pedido-box .center-box').attr('id','')//disabled modal
					    // console.log($scope.productos)
					  }, function errorCallback(response) {
					    console.log(response)
					    $('.pedido-box').attr('id','off')//disable modal
					    $('.pedido-box .center-box').attr('id','label-off')//disable label of box					    
					  });
				}else{

				}
		},addProduct:function(){
			var total = 0;			
			$("#lista-neta .elegible input:checked").each(function(i, elem){
              var item = "#item"+this.id;//id for items list
              $(item).removeClass('item none');//delete none
              $(item).addClass('item show');//add show
              var element = "#prex"+this.id;//price id for bucle
              $(element).removeClass('pnone')
			  $(element).addClass('pshow')
			  var p = "#p"+this.id;
			  var getp = parseFloat($(p).val());
			  total = parseFloat(total)+getp;          
          	});
			$('#total').val(total)
		},remove:function(index){
			var nitem = index.$index;//index.$index -> value of id
			var check = "#"+nitem;
			var element = "#prex"+nitem;
			//remove item #
			var item = "#item"+nitem;
			$(item).removeClass('item show');
			$(item).addClass('item none');
			$(element).removeClass('pshow')
			$(element).addClass('pnone')
			$(check).prop('checked', false);
			//bucle for new result price
			var a = 0;
			total = 0;
			$("#list-product .show .rigth-40 .pshow input[type=hidden]").each(function(){
				var actual = parseFloat($(this).val())
				total = total + actual;
			})
			var del = $("#delivery").val();
			var net = parseFloat(del) + total;
			$("#monto-cobrar").val(net);
			$('#total').val(total)
		},neto:function(){
			var delivery=$("#delivery").val();
			if (delivery=="") {
				delivery=0;
			}
			var neto = parseFloat($("#total").val())+parseFloat(delivery);
			$("#monto-cobrar").val(neto)
		},viewMap: function(e){
			var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
			var key = '&key=AIzaSyDLJLGBPkIS9h7RdXSLCMOBussJjV94ZyA';
			var keyCode = 13;
			if (e.keyCode === keyCode) {
				$http({
					method: 'GET',
					url: url+$scope.destino+key
				}).then(function(r){
					if (r.data.results) {
						var p = r.data.results[0].geometry.location;
						$scope.destinoLatLng = p;
						map.setCenter(new google.maps.LatLng(p.lat,p.lng));
						marker.setPosition(new google.maps.LatLng(p.lat,p.lng));						
					}
				},function(c){
					console.log(c);
				})
			}
		},save:function(){
			var url = "";
			var products = [];
			var headquarters = {
				address:$scope.direction[0].address,
				location:{
					lat:$scope.direction[0].location.coordinates[0],
					lng:$scope.direction[0].location.coordinates[1]
				}
			};
			var destiny = {
				address:$("#destino").val(),
				location:{
					lat:marker.position.lat(),
					lng:marker.position.lng()
				}
			};
			var delivery = $("#delivery").val();
			if (delivery=="") {
				delivery=0;
			}
			$("#lista-neta .elegible input:checked").each(function(i, elem){
				var id 	  = "#"+this.id;
				var name  = "#n"+this.id;
				var price = "#p"+this.id;
				products.push({
					name :$(name).val(),
					price:$(price).val()
				})
			});
			$scope.object = {
				company 	: $("#restaurant-list option:selected").text(),
				headquarters: headquarters,
				comments	: $("#comentarios").val(),
				district	: $("#distrito").val(),
				destiny 	: destiny,
				reference	: $("#referencia").val(),
				products 	: products,
				subtotal	: $("#total").val(),
				payment		: $("#tipo-pago").val(),
				delivery	: delivery,
				neto 		: $("#monto-cobrar").val()
			}
			console.log($scope.object)
			$.ajax({
			  dataType: "json",
			  url	  : url,
			  data 	  : $scope.object,
			  success : function(r){
			  	// console.log(r)
			  },err   :function(s){
			  	// console.log(s)
			  }
			});
		}
	}
	$scope.getRestaurantes.company();
});
