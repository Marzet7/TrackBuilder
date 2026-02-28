const grid = document.getElementById("track-grid");

const params = new URLSearchParams(document.location.search);
const name = params.get("name");
const size = params.get("size");

const frag = document.createDocumentFragment();

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        const tile = document.createElement("div");
        tile.innerText = "test" + j;
        frag.appendChild(tile);
    }


}
grid.appendChild(frag);