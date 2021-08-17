function initMap(){    
    var map;
    map = new google.maps.Map(document.getElementById('map'),{
        center: {lat:35.943297, lng:136.186513},
        zoom: 18,
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
}
function getMyPlace() {
    var output = document.getElementById("result");
    if (!navigator.geolocation){//Geolocation apiがサポートされていない場合
      output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
      return;
    }
    function success(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      output.innerHTML = '<p>緯度 ' + lat + '° <br>経度 ' + lng + '°</p>';
      var latlng = new google.maps.LatLng(lat,lng) ;
      var map = new google.maps.Map( document.getElementById( 'map' ) , {
        center: latlng,
        zoom: 18,
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
      new google.maps.Marker( {
          map: map ,
          position: latlng ,
      });
    };
    function error() {
      output.innerHTML = "座標位置を取得できません";
    };
    navigator.geolocation.getCurrentPosition(success, error);
}
