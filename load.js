const loadList = document.getElementById("loadList");

function getLocalTracks() {
    return Object.keys(localStorage)
        .filter(key => key.startsWith("track_"))
        .map(key => JSON.parse(localStorage.getItem(key)));
}

function renderTrackList() {
    loadList.innerHTML = "";
    const tracks = getLocalTracks();

    if (tracks.length === 0) {
        loadList.innerText = "No saved tracks found.";
        return;
    }

    tracks.forEach(state => {
        const item = document.createElement("div");
        item.innerText = `${state.trackName} (${state.size}x${state.size})`;
        item.addEventListener("click", () => openTrack(state));
        loadList.appendChild(item);
    });
}

document.getElementById("import").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const state = JSON.parse(e.target.result);
        openTrack(state);
    };
    reader.readAsText(file);
});

function openTrack(state) {
    localStorage.setItem("active_track", JSON.stringify(state));
    window.location.href = `track.html?name=${state.trackName}&size=${state.size}`;
}

renderTrackList();