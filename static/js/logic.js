// Load the geoData
geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Promise Pending
const dataPromise = d3.json(geoData);
console.log("Data Promise:", dataPromise);

// Perform a GET request to the geoData
d3.json(geoData).then(function (data) {
    createFeatures(data.features);
})

// // ----- Create function to determine marker size based on earthquake magnitude
// function markerSize(mag) {
//     return Math.sqrt(mag) * 50;
// }

// // initialize Markers arrays
// let magMarkers = [];
// let depthMarkers = [];

// // Loop through features to create markers
// for (let i = 0; i < features.length; i++) {
//     magMarkers.push(
//        L.circle(features[i].geometry.coordinates, {
//         stroke: false,
//         fillOpacity: 0.75
//        }) 
//     )
    
// }

// Create the larger function
function createFeatures(earthquakeData) {
    

    // Define a function we want to run for each feature
    // Give each feature a popup that describes the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3?><hr><p>${new Date(feature.properties.time)}</p?`);
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // Push earthquakes layer to the createMap function
    createMap(earthquakes);
} 

// Create Map function
function createMap(earthquakes) {
    
    // Adding the tile layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create map object
    let map = L.map("map", {
    center: [37.0965, -113.5684],
    zoom: 4.5,
    layers: [street, earthquakes]
    });

}







