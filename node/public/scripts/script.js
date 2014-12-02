function initialize() {


//MAP
    //Settings for Goolge Map
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),                                              
        mapTypeId: google.maps.MapTypeId.ROADMAP,       
        styles: styleMaps(),
        disableDefaultUI: true,                         
        scrollwheel: false,                             
        draggable: false,
        zoom: 3                                    
    };

    //Crate Google Map with set parameters and link it to the UI DivElement 
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions); 




//MARKER
    //Create new Marker Icon
    var icon = new google.maps.MarkerImage("/images/twitter.png", null, null, new google.maps.Point(12.5,12.5), new google.maps.Size(25, 25));


    //Get Message from Server
    var socket = io();
    var idCount = 0;
    var visibilityCounter = false;
    var tweetIndexObjectArray = [];
    socket.on('chat message', function(msg){


        //Create new Marker
        var tweeterLan = new google.maps.LatLng(msg.coordinates.coordinates[1], msg.coordinates.coordinates[0]);
            marker = new google.maps.Marker({
            position: tweeterLan,
            icon: icon,                                     
            map: map                                         
        });
        marker.metadata = {type: "point", id: idCount};
        idCount++;


        //Create Event Listener for MouseOver Marker
        var inProgress = false;
        google.maps.event.addListener(marker, 'mouseover', function() {
            var markerObj = tweetIndexObjectArray[this.metadata.id];
            document.getElementById('name').innerHTML = markerObj.name;
            document.getElementById('text').innerHTML = markerObj.text;

            var projection = overlay.getProjection(); 
            var pixel = projection.fromLatLngToContainerPixel(this.getPosition());
            var width = div.offsetWidth;
            var newWidth = pixel.x - width/2;
            var newHeight = pixel.y - width/2;

            if (inProgress != true){
                inProgress = true;
                div.style.left = newWidth + 'px';
                div.style.top = newHeight + 'px';
                div.style.visibility = 'visible';
            
                setTimeout(function() {
                    document.getElementById('divGoogleContainer').style.visibility = 'visible';
                }, 800);


                //Create Event Listener for MouseOver Leave Marker
                $("#divGoogle" ).mouseleave(function(){
                    document.getElementById('divGoogleContainer').style.visibility = 'hidden';
                    setTimeout(function() {
                        div.style.visibility = 'hidden';
                        inProgress = false;
                    }, 600);
                });
            }
        });
        tweetIndexObjectArray.push(msg);
    });


    //Use Div and Overlay to eneable Hover
    var div = document.getElementById('divGoogle');
    var overlay = new google.maps.OverlayView();
    overlay.draw = function() {};
    overlay.setMap(map);




//INPUT ELEMENT
    var cityCounter = 1;


    //Link input variable with the text input from UI TextElement 
    var input = (document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var searchBox = new google.maps.places.SearchBox((input));


    //Create Event Listener for Selected Place
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
              return;
        }
        var searchPlace;


        //Get Coordinates for each Place
        for (var i = 0, place; place = places[i]; i++) {
            if(cityCounter === 1){
                document.getElementById('firstCityName').innerHTML = place.name;


                //Sent Place and Id to Server
                var coordinateObj = { 
                    coordinates: place.geometry.location, 
                    id: cityCounter
                }
                socket.emit('chat message', coordinateObj );


                //Make Circle to Zoom
                searchPlace = new google.maps.Circle({
                    center: place.geometry.location,
                    radius:25000,
                    strokeOpacity:0,
                    fillOpacity:0
                });
                searchPlace.setMap(map);



            } else if(cityCounter === 2){
                document.getElementById('secondCityName').innerHTML = place.name;

                //Sent Place and Id to Server
                var coordinateObj = { 
                    coordinates: place.geometry.location, 
                    id: cityCounter
                }
                socket.emit('chat message', coordinateObj );


                //Make Circle to Zoom
                searchPlace = new google.maps.Circle({
                    center: place.geometry.location,
                    radius:25000,
                    strokeOpacity:0,
                    fillOpacity:0
                });
                searchPlace.setMap(map);


            } else {
                alert('Reload Page to set more Locations');
            }
        }
        cityCounter++;
        map.fitBounds(searchPlace.getBounds());
    });

    


//CHANGE / LOAD MAP 
    //Event Listener
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
    google.maps.event.addDomListener(window, 'load', initialize);



//WATSON
    socket.on('watson message', function(msg){
        if (msg.id === 1){
            currentWatsonJSON1 = msg; 
            document.getElementById('firstCityProgressBarPercent').innerHTML = msg.watsonJSON[selectedWatsonParameter].value;
            document.getElementById('firstCityProgressBarPercent').style.visibility = 'visible';
            document.getElementById("firstCityProgressBarInner").style.width = msg.watsonJSON[selectedWatsonParameter].value;
            document.getElementById("firstCityStyleProgressBar").style.width = styleBarMinusTwo(msg.watsonJSON[selectedWatsonParameter].value) + '%';
        } else if (msg.id === 2){
            currentWatsonJSON2 = msg; 
            document.getElementById('secondCityProgressBarPercent').innerHTML = msg.watsonJSON[selectedWatsonParameter].value;
            document.getElementById('secondCityProgressBarPercent').style.visibility = 'visible';
            document.getElementById("secondCityProgressBarInner").style.width = msg.watsonJSON[selectedWatsonParameter].value;
            document.getElementById("secondCityStyleProgressBar").style.width = styleBarMinusTwo(msg.watsonJSON[selectedWatsonParameter].value) + '%';
        }

    });


//MENU
    changeButtomValue('+');
    document.getElementById('watson_header').innerHTML = watsonArray[selectedWatsonParameter];
}


var watsonArray = [
        "EMPTY",
        "Openness",
        "Adventurousness",
        "Artistic interests",
        "Emotionality",
        "Imagination",
        "Intellect",
        "Authority-challenging",

        "Conscientiousness",
        "Achievement striving",
        "Cautiousness",
        "Dutifulness",
        "Orderliness",
        "Self-discipline",
        "Self-efficacy",

        "Extraversion",
        "Activity level",
        "Assertiveness",
        "Cheerfulness",
        "Excitement-seeking",
        "Outgoing",
        "Gregariousness",

        "Agreeableness",
        "Altruism",
        "Cooperation",
        "Modesty",
        "Uncompromising",
        "Sympathy",
        "Trust",

        "Emotional range",
        "Fiery",
        "Prone to worry",
        "Melancholy",
        "Immoderation",
        "Self-consciousness",
        "Susceptible to stress",

        "Needs",
        "Challenge",
        "Closeness",
        "Curiosity",
        "Excitement",
        "Harmony",
        "Ideal",
        "Liberty",
        "Love",
        "Practicality",
        "Self-expression",
        "Stability",
        "Structure",

        "Values",
        "Conservation",
        "Openness to change",
        "Hedonism",
        "Self-enhancement",
        "Self-transcendence"
];




//Change Button Value
var pageCounter = 0; 
function changeButtomValue(plusOrMinus) {
    if( plusOrMinus === '+'){
        if (pageCounter != 6){
            pageCounter++;
        }
    } else {
        if (pageCounter != 1){
            pageCounter--;
        }
    }

    switch(pageCounter) {
        case 1:
            document.getElementById('button1').value = watsonArray[1];
            document.getElementById('button2').value = watsonArray[2];
            document.getElementById('button3').value = watsonArray[3];
            document.getElementById('button4').value = watsonArray[4];
            document.getElementById('button5').value = watsonArray[5];
            document.getElementById('button6').value = watsonArray[6];
            document.getElementById('button7').value = watsonArray[7];
            document.getElementById('button8').value = watsonArray[8];
            document.getElementById('button9').value = watsonArray[9];
            break;
        case 2:
            document.getElementById('button1').value = watsonArray[10];
            document.getElementById('button2').value = watsonArray[11];
            document.getElementById('button3').value = watsonArray[12];
            document.getElementById('button4').value = watsonArray[13];
            document.getElementById('button5').value = watsonArray[14];
            document.getElementById('button6').value = watsonArray[15];
            document.getElementById('button7').value = watsonArray[16];
            document.getElementById('button8').value = watsonArray[17];
            document.getElementById('button9').value = watsonArray[18];
            break;
        case 3:
            document.getElementById('button1').value = watsonArray[19];
            document.getElementById('button2').value = watsonArray[20];
            document.getElementById('button3').value = watsonArray[21];
            document.getElementById('button4').value = watsonArray[22];
            document.getElementById('button5').value = watsonArray[23];
            document.getElementById('button6').value = watsonArray[24];
            document.getElementById('button7').value = watsonArray[25];
            document.getElementById('button8').value = watsonArray[26];
            document.getElementById('button9').value = watsonArray[27];
            break;
        case 4:
            document.getElementById('button1').value = watsonArray[28];
            document.getElementById('button2').value = watsonArray[29];
            document.getElementById('button3').value = watsonArray[30];
            document.getElementById('button4').value = watsonArray[31];
            document.getElementById('button5').value = watsonArray[32];
            document.getElementById('button6').value = watsonArray[33];
            document.getElementById('button7').value = watsonArray[34];
            document.getElementById('button8').value = watsonArray[35];
            document.getElementById('button9').value = watsonArray[37];
            break;
        case 5:
            document.getElementById('button1').value = watsonArray[38];
            document.getElementById('button2').value = watsonArray[39];
            document.getElementById('button3').value = watsonArray[40];
            document.getElementById('button4').value = watsonArray[41];
            document.getElementById('button5').value = watsonArray[42];
            document.getElementById('button6').value = watsonArray[43];
            document.getElementById('button7').value = watsonArray[44];
            document.getElementById('button8').value = watsonArray[45];
            document.getElementById('button9').value = watsonArray[46];
            break;
        case 6:
            document.getElementById('button1').value = watsonArray[47];
            document.getElementById('button2').value = watsonArray[48];
            document.getElementById('button3').value = watsonArray[50];
            document.getElementById('button4').value = watsonArray[51];
            document.getElementById('button5').value = watsonArray[52];
            document.getElementById('button6').value = watsonArray[53];
            document.getElementById('button7').value = watsonArray[54];
            document.getElementById('button8').value = '';
            document.getElementById('button9').value = '';
            break;
    }
}



//Change Watson Value
var currentWatsonJSON1; 
var currentWatsonJSON2; 
var selectedWatsonParameter = 1;
function selectWatsonValue(selectedButton) {
    var buttonValue = document.getElementById('button' + selectedButton).value;
    for (var watsonArrayCount=0;  watsonArrayCount<55; watsonArrayCount++){
        if ( watsonArray[watsonArrayCount] === buttonValue){
            selectedWatsonParameter = watsonArrayCount;
        }
    }
    document.getElementById('watson_header').innerHTML = watsonArray[selectedWatsonParameter];

    if (currentWatsonJSON1 != null){
            document.getElementById('firstCityProgressBarPercent').innerHTML = currentWatsonJSON1.watsonJSON[selectedWatsonParameter].value;
            document.getElementById('firstCityProgressBarPercent').style.visibility = 'visible';
            document.getElementById("firstCityProgressBarInner").style.width = currentWatsonJSON1.watsonJSON[selectedWatsonParameter].value;
            document.getElementById("firstCityStyleProgressBar").style.width = styleBarMinusTwo(currentWatsonJSON1.watsonJSON[selectedWatsonParameter].value) + '%';
    }
    if (currentWatsonJSON2 != null){
            document.getElementById('secondCityProgressBarPercent').innerHTML = currentWatsonJSON2.watsonJSON[selectedWatsonParameter].value;
            document.getElementById('secondCityProgressBarPercent').style.visibility = 'visble';
            document.getElementById("secondCityProgressBarInner").style.width = currentWatsonJSON2.watsonJSON[selectedWatsonParameter].value;
            document.getElementById("secondCityStyleProgressBar").style.width = styleBarMinusTwo(currentWatsonJSON2.watsonJSON[selectedWatsonParameter].value) + '%';
    }
}




//Watson Percentage String without Percent Symbol 
function styleBarMinusTwo(currentValue){
            var integer = '';
            for (var y=0; y<currentValue.length; y++){
                if(currentValue[y] != '%'){
                    integer = integer + currentValue[y];
                }
            }
            return (parseInt(integer) - 2);
}




//Style GoogleMaps
function styleMaps() {
    var stylearray = [
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#a2daf2"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f7f1df"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#d0e3b4"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#bde6ab"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fbd3da"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffe15f"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#efd151"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "black"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#cfb2db"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off" 
                }
            ]
        }
    ]
    return stylearray;
}