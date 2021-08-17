function initMap(){
    var map;
    var lat = 35.94292;
    var lng = 136.186513;
    var latlng = new google.maps.LatLng(lat,lng);
    var infowindow;
    var nowlat;
    var nowlng;
    var nowlatlng;
    if( navigator.geolocation ){
        navigator.geolocation.getCurrentPosition(
            function( position ){
                var data = position.coords ;
                nowlat = data.latitude ;
                nowlng = data.longitude ;
                nowlatlng = new google.maps.LatLng( nowlat,nowlng ) ;
                map = new google.maps.Map(document.getElementById('map'),{
                    center: nowlatlng,
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
                var targetMarker = new google.maps.Marker( {
                    map: map ,
                    position: latlng ,
                });
                var myMarker = new google.maps.Marker({
                    map: map,
                    position: nowlatlng,
                });
                var myInfoWindow = new google.maps.InfoWindow({
                    content:'現在地です'
                });
                var targetInfoWindow = new google.maps.InfoWindow({
                    content:'めがね会館です'
                });

                targetInfoWindow.open(map,targetMarker);
                google.maps.streetViewControl.addListener(targetInfoWindow,"closeclick",function(){
                    google.maps.event.addListenerOnce(targetMarker,"click",function(event){
                        myInfoWindow.open(map,targetMarker);
                    });
                });

                // myInfoWindow.open(map,myMarker);
                // google.maps.streetViewControl.addListener(myInfoWindow,"closeclick",function(){
                //     google.maps.event.addListenerOnce(myMarker,"click",function(event){
                //         myInfoWindow.open(map,myMarker);
                //     });
                // });
            } 
        );
    } 
}