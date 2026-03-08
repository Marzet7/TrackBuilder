const grid = document.getElementById("track-grid");
const grass = document.getElementById("grass");
const asphalt = document.getElementById("asphalt");
const water = document.getElementById("water");
const saveBtn = document.getElementById("btn-save");
const exportBtn = document.getElementById("btn-export");

const params = new URLSearchParams(document.location.search);
const trackName = params.get("name");
const size = params.get("size");

document.title = trackName;

grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

let selected;
const tileState = Array.from({ length: size }, () => Array(size).fill(0));

const materials = {
    0: "./img/grass.png",
    1: "./img/asphalt.png",
    2: "./img/water.png"
};

grass.addEventListener("click", function() {selected = 0;});
asphalt.addEventListener("click", function() {selected = 1;});
water.addEventListener("click", function() {selected = 2;});
saveBtn.addEventListener("click", saveToLocalStorage);


function applyMaterial(tile, value) {
    tile.style.backgroundImage = `url(${materials[value]})`;
}

function changeMaterial(tile, i, j) {
    tileState[i][j] = selected ?? 0;
    applyMaterial(tile, tileState[i][j]);
}

const frag = document.createDocumentFragment();

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        const tile = document.createElement("div");
        tile.style.backgroundImage = "url(./img/grass.png)";
        tile.addEventListener("click", () => changeMaterial(tile, i, j))
        frag.appendChild(tile);
    }
}
grid.appendChild(frag);

function getTrackState() {
    return { trackName, size, tiles: tileState };
}

function applyTrackState(state, tiles) {
    for (let i = 0; i < state.size; i++) {
        for (let j = 0; j < state.size; j++) {
            tileState[i][j] = state.tiles[i][j];
            applyMaterial(tiles[i * state.size + j], tileState[i][j]);
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem(`track_${trackName}`, JSON.stringify(getTrackState()));
}
