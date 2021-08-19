'use strict';
var flag = false;
var i=0;
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
    
    const dist = getDist(lat, lng, targetlat, targetlng); // 現在地と目的地との距離を取得

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

    var infoWindow = new google.maps.InfoWindow({
		content: 'めがね会館'
	});

	google.maps.event.addListener(TargetMarker, 'click', function() {
		infoWindow.open(map,TargetMarker);
	});

    var Marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon:{
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            rotation: -90,
            fillColor: '#7fbfff',
            fillOpacity: 0.7,
            strokeColor: '#000000',
            strokeWeight: 2 
        }
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
    google.maps.event.addListener(map, 'click', event => clickListener(event, map));


    function clickListener(event, map) {
        let text = prompt('説明を入力して下さい','例:jig.jp');
        let lat = event.latLng.lat();
        let lng = event.latLng.lng();
        if(text!=null){
            switch (i){
                case 0:
                    var Marker = new google.maps.Marker({
                        position: {lat, lng},
                        map:map,
                        icon:{
                            url: './img/star.png',
                            scaledSize: new google.maps.Size(35,35)
                        }
                    });
                    break;

                case 1:
                    var Marker = new google.maps.Marker({
                        position: {lat, lng},
                        map:map,
                        icon:{
                            url: './img/food.png',
                            scaledSize: new google.maps.Size(35,35)
                        }
                    });
                    i=0;
                    break;

                case 2:
                    var Marker = new google.maps.Marker({
                        position: {lat, lng},
                        map:map,
                        icon:{
                            url: './img/can.png',
                            scaledSize: new google.maps.Size(35,35)
                        }
                    });
                    i=0;
                    break;

                case 3:
                    var Marker = new google.maps.Marker({
                        position: {lat, lng},
                        map:map,
                        icon:{
                            url: './img/jinja.png',
                            scaledSize: new google.maps.Size(35,35)
                        }
                    });
                    i=0;
                    break;
    
                case 4:
                    var Marker = new google.maps.Marker({
                        position: {lat, lng},
                        map:map,
                        icon:{
                            url: './img/yama.png',
                            scaledSize: new google.maps.Size(35,35)
                        }
                    });
                    i=0;
                    break;

            }
            var infoWindow = new google.maps.InfoWindow({
                content: text
            });
            google.maps.event.addListener(Marker, 'click', function() {
                if(flag==false){
                    infoWindow.open(map,Marker);
                }else{
                    Marker.setMap(null);
                    flag = false;
                }                  
            });    
        }else{
            return;
        }
    }    
}
function error(e){
    alert("エラーが発生しました - " + e.message);
}

function onClick(){
    alert('削除するマーカーを選択してください');
    flag = true;
}

function changeImg(num){
    alert('マーカーを置きたい場所を選択してください');
    i = num;   
}

function change_map(num){
    alert(num)
    sessionStorage.setItem("ID",num);
}