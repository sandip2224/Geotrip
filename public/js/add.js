const locationForm = document.getElementById('location-form')
const locationId = document.getElementById('location-id')
const locationAddress = document.getElementById('location-address')

locationForm.addEventListener('submit', addLocation)

async function addLocation(e) {
    e.preventDefault()
    if (locationId.value === '' || locationAddress.value === '') {
        alert('Please fill in fields')
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
        if (res.status === 400) throw Error('Location already exists!')
        alert('Location added!')
        window.location.href = '/index.html';
    }
    catch (err) {
        alert(err);
        return;
    }
}