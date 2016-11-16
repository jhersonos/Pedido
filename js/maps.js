var map = null;
var infoWindow = null;
 
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
 
    var marker = new google.maps.Marker({
        position: myLatlng,
        draggable: true,
        map: map,
        title:'Diloo'
    });
 
    google.maps.event.addListener(marker, 'click', function(){
        openInfoWindow(marker);
    });
}

$(document).ready(function() {
    initialize();
});

