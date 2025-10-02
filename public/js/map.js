
//Without GeoJSON

//custom Icon
var customIcon = L.icon({
    iconUrl: 'path/to/your-custom-icon.png',
    iconSize: [30, 50], // size of the icon
    iconAnchor: [15, 50], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
});

//Red Icon
var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

async function getCoordinates(location) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
        const data = await res.json();
        if (!data.length) return null;
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } catch (err) {
        console.error("Error fetching coordinates:", err);
        return null;
    }
}

(async () => {
    const coords = await getCoordinates(listingLocation);
    if (!coords) return;

    const map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    //custom Icon
    // L.marker(coords, { icon: customIcon }).addTo(map)       

    //Red Icon
    L.marker(coords, { icon: redIcon }).addTo(map)

    // L.marker(coords).addTo(map)
        .bindPopup(listingTitle)
        .openPopup();
     var circle = L.circle(coords, {
        color: 'grey',
        fillColor: "#5a5a5a",
        fillOpacity: 0.5,
        radius: 1000
        }).addTo(map);
})();

