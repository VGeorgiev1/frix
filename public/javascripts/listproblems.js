let problems = [];

fetch('/problem/probleminfo')
    .then(x => x.json())
    .then((data) => {
        problems = data;
    })
    .then(initMap)
    .then(() => {
        problems.forEach(x => initMarker(x));
    });

var map;

function initMap() {
    var centerOfMap = new google.maps.LatLng(42.69, 23.32);

    var options = {
        center: centerOfMap,
        zoom: 13
    };

    map = new google.maps.Map(document.getElementById('map'), options);
}

function initMarker(problem) {
    let marker = new google.maps.Marker({
        position: { lat: problem.lat, lng: problem.lng },
        map: map,
        draggable: false
    });

    var infowindow = new google.maps.InfoWindow({
        content: generatePopupHTML(problem)
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
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

function generatePopupHTML(problem) {
    return `
<h1>${problem.title}</h1>
<p>${problem.description}</p>
<img src='/${problem.picture}'></img>
    `;
}