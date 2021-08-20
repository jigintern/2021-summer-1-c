'use strict';
const locationID = sessionStorage.getItem("ID") || 1;

var flag = false;
var i=8;
function initMap(){
    if (typeof(navigator.geolocation) != 'undefined') {
        navigator.geolocation.watchPosition(success, error);
    }
}

async function success(position) {
    const location = await getLocation(locationID); // 目的地

    var targetlat = location.lat;
    var targetlng = location.lng;
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

    var infoWindow = new google.maps.InfoWindow({
		content: location.name
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
        let comment = document.getElementById('comment');
        let text = comment.value;
        if(text == ''){
            text = 'お気に入り';
        }
        let lat = event.latLng.lat();
        let lng = event.latLng.lng();
        let posi = [lat,lng];
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
                    break;
                
                case 5:
                    var Marker = new google.maps.Marker({
                        position: {lat, lng},
                        map:map,
                        icon:{
                            url: './img/temple.png',
                            scaledSize: new google.maps.Size(35,35)
                        }
                    });
                    break;

                case 6:
                var Marker = new google.maps.Marker({
                    position: {lat, lng},
                    map:map,
                    icon:{
                        url: './img/panda.png',
                        scaledSize: new google.maps.Size(35,35)
                    }
                });
                break;

                case 7:
                    var Marker = new google.maps.Marker({
                        position: {lat, lng},
                        map:map,
                        icon:{
                            url: './img/tenboudai.png',
                            scaledSize: new google.maps.Size(35,35)
                        }
                    });
                    break;
                case 8:
                    return;

            }

            add_Marker(i, posi, text);
            i = 8;

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

    /* マーカーがある場合は追加 */
    const initMarker = async () => {
        const travelID = getCookieArray().travelID;
        const { data } = await getTravelData(travelID);

        for (const i in data) {
            if (data[i].type === 'icon') {
                console.log(data[i]);
                let Marker = new google.maps.Marker({
                    map: map,
                    position: {
                        lat: data[i].lat,
                        lng: data[i].lng
                    },
                    icon: {
                        url: data[i].src,
                        scaledSize: new google.maps.Size(35,35)
                    }
                });
                let infoWindow = new google.maps.InfoWindow({
                    content: data[i].comment
                });
                google.maps.event.addListener(Marker, 'click', function() {
                    if(flag==false){
                        infoWindow.open(map,Marker);
                    }else{
                        delete_Marker(Marker);
                        Marker.setMap(null);
                        flag = false;
                    }                  
                });    
            }
        }
    }

    /* 目的地情報をマップに表示 */
    const DisplayInfo = async () => {
        // const data = await getDisplayInfo(locationID, lat, lng, targetlat, targetlng); // 表示する情報を取得
        const data = await getDisplayInfo(locationID, lat, lng, targetlat, targetlng, 100); // 表示する情報を取得（距離を偽造)

        for (const i in data) {
            let Marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: data[i].lat,
                    lng: data[i].lng
                },
                icon: {
                    url: './img/star.png',
                    scaledSize: new google.maps.Size(35,35)
                }
            });
            let infoWindow = new google.maps.InfoWindow({
                content: data[i].info
            });
            google.maps.event.addListener(Marker, 'click', function() {
                if(flag==false){
                    infoWindow.open(map,Marker);
                }else{
                    Marker.setMap(null);
                    delete_Marker(Marker);
                    flag = false;
                }                  
            });
        }
    }

    initMarker();
    DisplayInfo();
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
    //alert(num)
    sessionStorage.setItem("ID", num);
}

/* マーカーデータ追加 */
async function add_Marker(iconID, position, comment) {
    const travelID = getCookieArray().travelID;
    let lat = position[0];
    let lng = position[1];
    let item = {
        travelID: travelID,
        data: {
            type: "icon",
            iconID: iconID,
            comment: comment,
            lat: lat,
            lng: lng
        }
    };

    let ret = await fetchJSON("api/add", item);
    if (ret.match(/push ok/)) console.log("push ok");
}

/* マーカーデータを削除 */
async function delete_Marker(Marker) {
    const travelID = getCookieArray().travelID;
    const lat = Marker.getPosition().lat();
    const lng = Marker.getPosition().lng();

    const ret = await fetchJSON("api/delete", {travelID, lat, lng});
    if (ret.match(/push ok/)) console.log("push ok");
}

function changeMarker(){
	const places = document.form1.places;

	// 値(数値)を取得
	const num = places.selectedIndex;
	//const num = document.form1.color1.selectedIndex;

	// 値(数値)から値(value値)を取得
	changeImg(num);
}