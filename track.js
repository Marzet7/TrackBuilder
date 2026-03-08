const grid = document.getElementById("track-grid");
const grass = document.getElementById("grass");
const asphalt = document.getElementById("asphalt");
const water = document.getElementById("water");
const saveBtn = document.getElementById("btn-save");
const exportBtn = document.getElementById("btn-export");

const params = new URLSearchParams(document.location.search);
const trackName = params.get("name");
const size = Number(params.get("size"));

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
exportBtn.addEventListener("click", saveToFile);



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
        applyMaterial(tile, 0);
        tile.addEventListener("click", () => changeMaterial(tile, i, j))
        frag.appendChild(tile);
    }
}
grid.appendChild(frag);

const active = localStorage.getItem("active_track");
if (active) {
    localStorage.removeItem("active_track");
    applyTrackState(JSON.parse(active), grid.querySelectorAll("div"));
}

function getTrackState() {
    return { trackName, size, tiles: tileState };
}

function applyTrackState(state, tiles) {
    const s = Number(state.size);
    for (let i = 0; i < s; i++) {
        for (let j = 0; j < s; j++) {
            tileState[i][j] = state.tiles[i][j];
            applyMaterial(tiles[i * s + j], tileState[i][j]);
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem(`track_${trackName}`, JSON.stringify(getTrackState()));
}

function saveToFile() {
    const blob = new Blob([JSON.stringify(getTrackState(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${trackName}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
}