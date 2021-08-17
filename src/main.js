function initMap(){
    if (typeof(navigator.geolocation) != 'undefined') {
        navigator.geolocation.watchPosition(success, error);
    }
}
function success(position){
    var targetlat = 35.94292;
    var targetlng = 136.186513;
    var targetlatlng = new google.maps.LatLng(targetlat,targetlng);

    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var latlng = new google.maps.LatLng(lat,lng);

    var map = new google.maps.Map(document.getElementById('map'),{
        center: latlng,
        zoom: 17,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        streetViewControl:false,
        styles: [{
            featureType: 'all',
            elementType: 'labels',
            stylers: [
                { visibility: 'off' }
            ]
        }]
    });
    var TargetMarker = new google.maps.Marker({
        map: map,
        position: targetlatlng,
    });
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
    });
    if(lat>targetlat){
        var maxlat = lat;
        var minlat = targetlat;
    } else {
        var maxlat = targetlat;
        var minlat = lat;
    }

    if(lng>targetlng){
        var maxlng = lng;
        var minlng = targetlng;
    }else{
        var maxlng = targetlng;
        var minlng = lng;
    }
    var sw = new google.maps.LatLng(maxlat,minlng);
    var ne = new google.maps.LatLng(minlat,maxlng);
    var bounds = new google.maps.LatLngBounds(sw, ne);
    map.fitBounds(bounds,5);
}
function error(e){
    alert("エラーが発生しました - " + e.message);
}
