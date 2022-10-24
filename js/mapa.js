let map = L.map('map').setView([-34.5598689, -58.4514425], 12);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

let markerTina = L.marker([-34.5570653, -58.4525777]).addTo(map);
let markercasaChina = L.marker([-34.5573558, -58.4527654]).addTo(map);
let markerIchiban = L.marker([-34.5565086, -58.4533029]).addTo(map);
let markerCocktail = L.marker([-34.5641763, -58.458524]).addTo(map);
let markerMarcheBio = L.marker([-34.590647, -58.4157209]).addTo(map);
let markerLePot = L.marker([-34.6156851, -58.4400576]).addTo(map);
let markerMatchaLife = L.marker([-34.5936756, -58.3944317]).addTo(map);
let markerElote = L.marker([-34.5683417, -58.4378185]).addTo(map);

markerTina.bindPopup('Tina&Co, Mendoza 1678').openPopup();
markercasaChina.bindPopup('Casa China, Arribeños 2173').openPopup();
markerIchiban.bindPopup('Ichiban, Arribeños 2257').openPopup();
markerCocktail.bindPopup('Cocktail, Av. Cabildo 1849').openPopup();
markerMarcheBio.bindPopup('Marche Bio, Charcas 3383').openPopup();
markerLePot.bindPopup('Le Pot, Av. Acoyte 216').openPopup();
markerMatchaLife.bindPopup('Matcha Life, Rodriguez Peña 1336').openPopup();
markerElote.bindPopup('Elote, Jorge Newbery 1810').openPopup();

document.getElementById("select-location").addEventListener("change", (e) => {
  let coords = e.target.value.split(",");
  map.flyTo(coords, 16);
})