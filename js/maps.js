var map = null;
var infoWindow = null;
var marker
 
function openInfoWindow(marker) {
    var markerLatLng = marker.getPosition();
    infoWindow.setContent([
        'La posicion del marcador es: ',
        markerLatLng.lat(),
        ', ',
        markerLatLng.lng(),
        'Arrastrame y haz click para actualizar la posicion '
    ].join(''));
    infoWindow.open(map, marker);
}
 
function initialize() {
    var myLatlng = new google.maps.LatLng(-12.1144646,-77.04456529999999);
    var myOptions = {
      zoom: 15,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    map = new google.maps.Map($('#map').get(0), myOptions);
 
    infoWindow = new google.maps.InfoWindow();
 
    marker = new google.maps.Marker({
        position: myLatlng,
        draggable: true,
        map: map,
        title:'Diloo'
    });
 
    marker.addListener('click', function(){
        openInfoWindow(marker);
    });

    marker.addListener('dragend',function(e){
            map.panTo({
                lat: marker.getPosition().lat(),
                lng: marker.getPosition().lng()
            }); 
    })
}

$(document).ready(function() {
    initialize();
});

