var map;
function initMap(){
    map = new google.maps.Map(document.getElementById('map'),{
        center: {lat:35.446806, lng:139.636163},
        zoom: 8
    });
}