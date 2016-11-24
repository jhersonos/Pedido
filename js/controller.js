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
				$("#sav").attr("disabled",false);
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
			$("#monto-cobrar").val(total);
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
			var products = [];
			var distrito = $("#distrito").val();
			var referencia = $("#referencia").val();
			var client = $("#name-client").val();
			var destino = $("#destino").val();
			var tipo =$("#tipo-pago").val();
			var haddres = $scope.direction[0].address;
			var headquarters = {
				address:haddres,
				location:{
					lat:$scope.direction[0].location.coordinates[0],
					lng:$scope.direction[0].location.coordinates[1]
				}
			};
			$("#lista-neta .elegible input:checked").each(function(i, elem){
				var id 	  = "#"+this.id;
				var name  = "#n"+this.id;
				var price = "#p"+this.id;
				products.push({
					name :$(name).val(),
					price:$(price).val()
				})
			});
			var company = $("#restaurant-list").val();
			/*validation*/

			if (company!="") {
				$(".v").removeClass('err')
				if (headquarters.address!="") {
					$(".v").removeClass('err')
					if (products.length>0) {
						$(".v").removeClass('err')
						if (distrito!="") {
							$(".v").removeClass('err')
							if (destino!="") {
								$(".v").removeClass('err')
								if (referencia!="") {
									$(".v").removeClass('err')
									if (client!="") {
										$(".v").removeClass('err')
										if (tipo!="") {
											$(".v").removeClass('err')
											$("#sav").addClass("loading")
											$("#sav").attr("disabled",true)	
											var url = "";
											
											var destiny = {
												address:destino,
												location:{
													lat:marker.position.lat(),
													lng:marker.position.lng()
												}
											};
											var delivery = $("#delivery").val();
											if (delivery=="") {
												delivery=0;
											}
											var c = $("#comentarios").val();
											if (c=="") {
												c="--";
											}
											/*$("#lista-neta .elegible input:checked").each(function(i, elem){
												var id 	  = "#"+this.id;
												var name  = "#n"+this.id;
												var price = "#p"+this.id;
												products.push({
													name :$(name).val(),
													price:$(price).val()
												})
											});*/
											$scope.object = {
												company 	: $("#restaurant-list option:selected").text(),
												headquarter : headquarters,
												comments	: c,
												district	: distrito,
												destiny 	: destiny,
												reference	: referencia,
												products 	: products,
												subtotal	: $("#total").val(),
												payment		: tipo,
												delivery	: delivery,
												neto 		: $("#monto-cobrar").val(),
												client		: client

											}
											console.log($scope.object)//show elements of objeto

											$http({
												method: 'POST',
												url: 'http://localhost:3000/order',
												data:$scope.object,
												headers: { 'Content-Type': 'application/json;charset=utf-8' },
											}).then(function(r){
												$("#correct").modal({
									            blurring: true,
									            closable : true
									          }).modal('show') 
												console.log(r)
												$("#sav").attr("disabled",false)
												$("#sav").removeClass("loading")
												$("#restaurant-list").val("");
												$("#local-list").val("").attr("disabled",true);
												$("#comentarios").val("");	
												$("#distrito").val("");
												$("#total").val("");
												$("#destino").val("");
												$("#referencia").val("");
												$("#name-client").val("");
												$("#tipo-pago").val("");
												$("#delivery").val("");
												$("#monto-cobrar").val("");			
												$("#list-product .item").removeClass("show")
												$("#list-product .item").addClass("none");
												$('.pedido-box .center-box').attr('id','label-off')
												$('.pedido-box').attr('id','off')
												$('.prex').removeClass('pshow')
												$('.prex').addClass('pnone')

											},function(c){
												console.log(c)
												$("#msg").append(c.data.message);
												$("#sav").attr("disabled",false)
												 $('#error').modal({
										            blurring: true,
										            closable : true
										          }).modal('show'); 
													})
										}else{
											// border tipo
											$('#complete').modal({
										 	blurring: true,
							        		closable : true}).modal('show'); 
											$("#tipo-pago").addClass('err')
										}
									}else{
										// border client
										$('#complete').modal({
									 	blurring: true,
						        		closable : true}).modal('show'); 
										$("#name-client").addClass('err')
									}
								}else{
									// border referencia
									$('#complete').modal({
								 	blurring: true,
					        		closable : true}).modal('show'); 
									$("#referencia").addClass('err')
								}
							}else{
								// border destino
								$('#complete').modal({
							 	blurring: true,
				        		closable : true}).modal('show'); 
								$('#destino').addClass('err')
							}
						}else{
							// distrito border
							$('#complete').modal({
						 	blurring: true,
		            		closable : true}).modal('show'); 
							$("#distrito").addClass('err')
						}
					}else{
						//product border 
						$('#complete').modal({
					 	blurring: true,
	            		closable : true}).modal('show'); 
						$(".pedido-box").addClass("err")
					}
				}else{
					// border address
					$('#complete').modal({
				 	blurring: true,
            		closable : true}).modal('show'); 
					$("#local-list").addClass("err")
				}
			}else{
				// border company
				 $('#complete').modal({
				 	blurring: true,
            		closable : true}).modal('show'); 
				$("#restaurant-list").addClass("err")
			}

			/*end validation*/
			





		}
	}
	$scope.getRestaurantes.company();
});
