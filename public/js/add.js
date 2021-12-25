const locationForm = document.getElementById('location-form')
const locationId = document.getElementById('location-id')
const locationAddress = document.getElementById('location-address')

locationForm.addEventListener('submit', addLocation)

async function addLocation(e) {
    e.preventDefault()
    if (locationId.value.trim() === '' || locationAddress.value.trim() === '') {
        document.getElementById("alert2").style.display = "block";
        return;
    }
    const bodyVal = {
        locationId: locationId.value,
        address: locationAddress.value
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
            document.getElementById("alert3").style.display = "block";
            return;
        }
        document.getElementById("alert1").style.display = "block";
        window.location.href = '/index.html';
    }
    catch (err) {
        console.log(err)
        return;
    }
}