angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {


})

.controller('HomeCtrl', function($scope, $ionicPlatform, $log) {

    var map; // Google map instance
    $scope.mapExpanded = false;
    $scope.mapHeight = {
        "height" : "35%"
    };

    $scope.position = {
        "lat" : "40.748148",
        "lng" : "-73.985894"
    }

    $scope.toggleMap = function() {

        if ($scope.mapExpanded) {
            $scope.mapExpanded = false;
            $scope.mapHeight = {
                "height" : "35%"
            }
            console.log('mapExpanded: ' + $scope.mapExpanded);
        }
        else {
            $scope.mapExpanded = true;
            $scope.mapHeight = {
                "height" : "100%"
            }
            console.log('mapExpanded: ' + $scope.mapExpanded);
        }
    };

    function loadMap() {

        $log.log('loading map');

        var div = document.getElementById("map-canvas");

        // Initialize the map view
        map = plugin.google.maps.Map.getMap(div, {
            'mapType': plugin.google.maps.MapTypeId.ROADMAP,
            'controls': {
                'compass': true,
                'myLocationButton': false,
                'indoorPicker': true,
                'zoom': true
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            },
            'styles': [
                {
                    featureType: "all",
                    stylers: [
                        { saturation: -80 }
                    ]
                },{
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [
                        { hue: "#00ffee" },
                        { saturation: 50 }
                    ]
                },{
                    featureType: "poi.business",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }
            ],
            'camera' : {
                target: {
                    lat: $scope.position.lat,
                    lng: $scope.position.lng
                },
                zoom: 10
            },
            'preferences': {
                'zoom': {
                    'minZoom': 10,
                    'maxZoom': 18
                },
                'building': false
            }
        });

        // Wait until the map is ready status.
        map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

        function onMapReady() {
            $log.log('Map Ready');

            map.addMarker({
                'position': {
                    lat: $scope.position.lat,
                    lng: $scope.position.lng
                }
            });
        }
    }

    $scope.$on("$ionicView.enter", function(event, data){
        loadMap();
    });

    $ionicPlatform.ready(function() {
        loadMap();
    });



})

.controller('OtherCtrl', function($scope) {


})
