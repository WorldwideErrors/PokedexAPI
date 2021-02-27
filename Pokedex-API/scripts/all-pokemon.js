
let urlPokemon = "https://pokeapi.co/api/v2/pokemon?limit=151";

fetch(urlPokemon)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then(function (data) {   
      console.log(data); 
      fetchPokemon(data);
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });

function fetchPokemon(data){
    let i = 1;
    data.results.forEach(data => {
        let urlSinglePokemon = "https://pokeapi.co/api/v2/pokemon/" + i;
        i++;
        fetch(urlSinglePokemon)
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESPONSE NOT OK");
        }
        })
        .then(function (data) {   
        displayPokemon(data);
        console.log(data); 
        })
        .catch((error) => {
        console.error("FETCH ERROR:", error);
        });
    }); 
}

function displayPokemon(data){
    const div = document.getElementById("allPokemon");

    // Afbeelding instellen
    const art = data.sprites.other["official-artwork"].front_default;
    const images = document.createElement("span");
    images.innerHTML = "<a href='pokemon.html?pk=" + data.id + "' /> <img class='singleThumbnail m-3' src='" + art + "'> </a>";

    div.appendChild(images);
}