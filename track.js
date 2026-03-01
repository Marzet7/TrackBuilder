const grid = document.getElementById("track-grid");
const grass = document.getElementById("grass");
const asphalt = document.getElementById("asphalt");
const water = document.getElementById("water");

const params = new URLSearchParams(document.location.search);
const trackName = params.get("name");
const size = params.get("size");

document.title = trackName;

grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

let selected;

grass.addEventListener("click", function() {
    selected = 0;
})

asphalt.addEventListener("click", function() {
    selected = 1;
})

water.addEventListener("click", function() {
    selected = 2;
})

function changeMaterial(tile) {
    switch(selected) {
        case 1 : tile.style.backgroundImage = "url(./img/asphalt.png)"; break;
        case 2 : tile.style.backgroundImage = "url(./img/water.png)"; break;
        default: case 0 : tile.style.backgroundImage = "url(./img/grass.png)"; break;
    }
    
}

const frag = document.createDocumentFragment();

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        const tile = document.createElement("div");
        tile.style.backgroundImage = "url(./img/grass.png)";
        tile.addEventListener("click", () => changeMaterial(tile))
        frag.appendChild(tile);
    }


}
grid.appendChild(frag);

