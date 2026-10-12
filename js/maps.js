
// OpenLayers map initialization

const openlayersMap = new ol.Map({
    target: 'openlayers-map',

    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                wrapX: false
            })
        })
    ],

    view: new ol.View({
        center: ol.proj.fromLonLat([32.733, 39.868]),
        zoom: 15,
        multiWorld: false
    })
});

// HACETTEPE UNIVERSITY MARKER

const hacettepeMarker = new ol.Feature({
    geometry: new ol.geom.Point(
        ol.proj.fromLonLat([32.733, 39.868])
    ),
    name: 'Hacettepe University'
});

hacettepeMarker.setStyle(
    new ol.style.Style({
        image: new ol.style.Circle({
            radius: 9,
            fill: new ol.style.Fill({
                color: '#e63946'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffffff',
                width: 3
            })
        })
    })
);

// Create marker layer
const markerLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [hacettepeMarker],
        wrapX: false
    }),
    minZoom: 14
});

// Add marker layer to the map
openlayersMap.addLayer(markerLayer);

// LEAFLET MAP - CITIES OF TURKEY

const leafletMap = L.map('leaflet-map', {
    center: [39.0, 35.0],
    zoom: 6,
    worldCopyJump: false,
    maxBounds: [
        [-85, -180],
        [85, 180]
    ],
    maxBoundsViscosity: 1.0
});

// OpenStreetMap base layer
L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; OpenStreetMap contributors',
        noWrap: true
    }
).addTo(leafletMap);



// Create a group for city markers
const cityMarkers = L.layerGroup();

L.marker([39.9334, 32.8597])
    .bindPopup("<b>Ankara</b><br>Capital of Turkey")
    .addTo(cityMarkers);

L.marker([41.0082, 28.9784])
    .bindPopup("<b>Istanbul</b><br>Largest city of Turkey")
    .addTo(cityMarkers);

L.marker([38.4237, 27.1428])
    .bindPopup("<b>Izmir</b><br>City on the Aegean coast")
    .addTo(cityMarkers);


// Show city markers only at zoom level 6 or higher

function updateCityMarkers() {
    const currentZoom = leafletMap.getZoom();

    if (currentZoom >= 6) {
        if (!leafletMap.hasLayer(cityMarkers)) {
            leafletMap.addLayer(cityMarkers);
        }
    } else {
        if (leafletMap.hasLayer(cityMarkers)) {
            leafletMap.removeLayer(cityMarkers);
        }
    }
}

// Run when the map zoom changes
leafletMap.on('zoomend', updateCityMarkers);

// Check the zoom level when the page loads
updateCityMarkers();
