const form = document.querySelector("form");

let data;

form.addEventListener("submit", function() {
    data = new FormData(form);
} );

