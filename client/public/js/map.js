const userId = document.getElementById('user-id')
const locationId = document.getElementById('location-id')
const locationForm = document.getElementById('location-form')
const locationAddress = document.getElementById('location-address')

locationForm.addEventListener('submit', addLocation)

//---------------------------------- POST request handler starts ---------------------------------//
async function addLocation(e) {
    e.preventDefault()
    if (locationId.value.trim() === '' || locationAddress.value.trim() === '') {
        document.getElementById("alert2").style.display = "block"
        return
    }
    const bodyVal = {
        locationId: locationId.value,
        address: locationAddress.value,
        userId: userId.value
    }
    try {
        const res = await fetch('/api/v1/places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyVal)
        })
        if (res.status === 400) {
            document.getElementById("alert3").style.display = "block"
            return
        }
        document.getElementById("alert1").style.display = "block"
        window.location.href = '/home'
    }
    catch (err) {
        console.log(err)
        return
    }
}

//---------------------------------- POST request handler ends ---------------------------------//

//--------------------- Fetch locations from API and map rendering starts-----------------------------//

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZGlwYW4yMjI0IiwiYSI6ImNsM2p2aWN2NjBrc2wzcW83cGZvM3hvdGcifQ.eXaDnUSmiZZ91xnuYFWMsw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 4,
    center: [-77.4144, 25.0759]
})

async function getLocations() {
    const res = await fetch('/api/v1/places')
    const locs = await res.json()
    const filteredLocs = locs.data.filter(loc => loc.userId == userId.value)
    const places = filteredLocs.map(loc => {
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
            'source': 'point',
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
//--------------------- Fetch locations from API and map rendering ends -----------------------------//

getLocations()