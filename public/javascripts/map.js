//map.js

//Set up some of our variables.
var map; //Will contain map object.
var marker = false;
//Function called to initialize / create the map.
//This is called when the page has loaded.
function initMap() {
    //The center location of our map.
    var centerOfMap = new google.maps.LatLng(42.69, 23.32);

    //Map options.
    var options = {
        center: centerOfMap, //Set center.
        zoom: 13 //The zoom value.
    };

    //Create the map object.
    map = new google.maps.Map(document.getElementById('map'), options);
    if (typeof userLocation != 'undefined') {
        initMarker(userLocation);
        map.setCenter(userLocation);
    }
    navigator.geolocation.getCurrentPosition((position) => {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        if (marker == false) {
            initMarker(pos);
            map.setCenter(pos);
        }/*
        else {
            marker.setPosition(pos);
            map.setCenter(pos);
        }*/
        markerLocation();
    })

    //Listen for any clicks on the map.
    google.maps.event.addListener(map, 'click', function (event) {
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if (marker === false) {
            //Create the marker.
            initMarker(clickedLocation);
        } else {
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }
        markerLocation();
    });
}

function initMarker(location) {
    console.log(map);
    marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: false //make it draggable
    });
    markerLocation();
    //Listen for drag events!
    google.maps.event.addListener(marker, 'dragend', function (event) {
        markerLocation();
    });
}

//This function will get the marker's current location and then add the lat/long
//values to our textfields so that we can save the location.
function markerLocation() {
    //Get location.
    var currentLocation = marker.getPosition();
    //Add lat and lng values to a field that we can save.
    document.getElementById('lat').value = currentLocation.lat(); //latitude
    document.getElementById('lng').value = currentLocation.lng(); //longitude
}


//Load the map when the page has finished loading.
initMap();