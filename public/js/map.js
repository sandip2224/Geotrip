mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZGlwMjIyNCIsImEiOiJja3hhNWhuY3EwZTZ6Mm9td3dvdnp0eThsIn0.K56FMglwPMghPY0Finou_g';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 3,
    center: [-77.4144, 25.0759]
})

// Fetch locations from API
async function getLocations() {
    const res = await fetch('/api/v1/places')
    const locs = await res.json()
    const places = locs.data.map(loc => {
        return {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [loc.location.coordinates[0], loc.location.coordinates[1]]
            },
            properties: {
                locationId: loc.locationId,
                icon: 'suitcase'
            }
        }
    })
    loadMapPoints(places)
}

function loadMapPoints(places) {
    map.on('load', () => {
        map.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': places
            }
        });
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'point', // reference the data source
            'layout': {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{locationId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        })
    })
}

getLocations()