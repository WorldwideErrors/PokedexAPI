const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemon = urlParams.get('pk')
let urlPokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

let rndSeen = Math.floor(Math.random() * 10);
let rndCaught = Math.floor(Math.random() * 10);

while(rndSeen < rndCaught){
    rndSeen = rndSeen + Math.floor(Math.random() * 10);
}

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
      displayData(data);
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });

let urlSpecies = "https://pokeapi.co/api/v2/pokemon-species/" + pokemon;

fetch(urlSpecies)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then(function (data) {   
      console.log(data); 
      fetchEvolve(data)
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });

function fetchEvolve(data){
    urlEvolve = data.evolution_chain.url;
    fetch(urlEvolve)
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESPONSE NOT OK");
        }
        })
        .then(function (data) {   
        console.log(data); 
        displayEvolves(data);
        })
        .catch((error) => {
        console.error("FETCH ERROR:", error);
        });
}

function displayData(data){
    const divNaam = document.getElementById("PKMN_Naam");
    const divInfo1 = document.getElementById("PKMN_lInfo");
    const divInfo2 = document.getElementById("PKMN_rInfo");
    const divIMG = document.getElementById("PKMN_IMG");
    // const div2 = document.getElementById("");

    // Variables
    const pokemon_name = data.name.toUpperCase();
    let index;

    let type1;
    let type2;
    
    let weight;
    let height;

    let maxAbilities = data.abilities.length;
    let ability;

    let front_female;
    let back_female;

    // 1e type vullen
    type1 = data.types[0].type.name;

    // 2e type vullen
    if(data.types.length > 1){
        type2 = data.types[1].type.name;
    }else{
        type2 = "unknown";
    }

    // Index vullen

    if(data.id > 0){
        index = data.id;
        if (index < 100){
            index = "#0" + index;
        }else{
            index = "#" + index;
        }
    }
    else if(data.id != null){
        index = data.id;
        if (index < 100){
            index = "#0" + index;
        }else{
            index = "#" + index;
        }
    }
    else{
        index = "# ???";
    }

    // Vullen gewicht
    weight = data.weight / 10;
    var decimalWeight = weight.toFixed(1);

    // Vullen lengte
    height = data.height / 10;
    const decimalHeight = height.toFixed(1);

    // ability zetten

    for(i = 0; i < maxAbilities; i++){
        if(data.abilities[i].ability.name != undefined){
            if(data.abilities[i].is_hidden != true){
                if(ability != null){
                    ability = ability + ", " + data.abilities[i].ability.name;
                }else{
                    ability = data.abilities[i].ability.name;
                }
                
            }
        }
    }

    // Afbeeldingen
    const front_default = data.sprites.front_default;
    const back_default = data.sprites.back_default;

    if(data.sprites.front_female != null && data.sprites.back_female != null){
        front_female = data.sprites.front_female;
        back_female = data.sprites.back_female;
    }else{
        front_female = "";
        back_female = "";
    }

    const front_shiny = data.sprites.front_shiny;
    const back_shiny = data.sprites.back_shiny;

    const art = data.sprites.other["official-artwork"].front_default;
    const dream = data.sprites.other.dream_world.front_default;
    
    const heading = document.createElement("h3");
    heading.innerHTML = 
    pokemon_name + " - " + index;
    divNaam.appendChild(heading);

    const info_Type1 = document.createElement("p");
    info_Type1.classList.add("information");
    info_Type1.classList.add("p-2");
    info_Type1.classList.add("text-center");
    info_Type1.classList.add(type1);
    info_Type1.innerHTML = "Type 1: " + type1; 

    const info_Type2 = document.createElement("p");
    info_Type2.classList.add("information");
    info_Type2.classList.add("p-2");
    info_Type2.classList.add("text-center");
    info_Type2.classList.add(type2);
    info_Type2.innerHTML = "Type 2: " + type2; 

    const info_Weight = document.createElement("p");
    info_Weight.classList.add("information");
    info_Weight.classList.add("p-2");
    info_Weight.classList.add("text-center");
    info_Weight.innerHTML = "Weight: <br/>" + decimalWeight + " kg"; 

    const info_Height = document.createElement("p");
    info_Height.classList.add("information");
    info_Height.classList.add("p-2");
    info_Height.classList.add("text-center");
    info_Height.innerHTML = "Height: <br/>" + decimalHeight + " m"; 

    const info_Seen = document.createElement("p");
    info_Seen.classList.add("information");
    info_Seen.classList.add("p-2");
    info_Seen.classList.add("text-center");
    info_Seen.innerHTML = "Seen: <br/>" + rndSeen; 

    const info_Caught = document.createElement("p");
    info_Caught.classList.add("information");
    info_Caught.classList.add("p-2");
    info_Caught.classList.add("text-center");
    info_Caught.innerHTML = "Caught: <br/>" + rndCaught; 
    
    const info_Abilities = document.createElement("p");
    info_Abilities.classList.add("information");
    info_Abilities.classList.add("p-2");
    info_Abilities.classList.add("text-center");
    info_Abilities.innerHTML = "Abilities: " + ability; 

    divInfo1.appendChild(info_Weight);
    divInfo1.appendChild(info_Height);
    divInfo1.appendChild(info_Type1);
    divInfo2.appendChild(info_Seen);
    divInfo2.appendChild(info_Caught);
    divInfo2.appendChild(info_Type2);
    divInfo2.appendChild(info_Abilities);

    const images = document.createElement("p");
    images.innerHTML = "<img class='picture' src='" + art + "'>";
    
    divIMG.appendChild(images);
}



function displayEvolves(data){
    
    // Get evolutions
    let maxSecEvolves = data.chain.evolves_to.length;
    let maxThirdEvolves = data.chain.evolves_to.length;
    if(data.chain.evolves_to.length > 0){
        maxThirdEvolves = data.chain.evolves_to[0].evolves_to.length;
    }else{
        maxThirdEvolves = 0;
    }
    let firstEvolve = data.chain.species.name; 

    //Fetch species of evolves
    let urlSpeciesEvolves = "https://pokeapi.co/api/v2/pokemon/" + firstEvolve;
    fetch(urlSpeciesEvolves)
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("NETWORK RESPONSE NOT OK");
    }
    })
    .then(function (data) {   
    displayFirstEvolve(data)
    console.log(data)
    })
    .catch((error) => {
    console.error("FETCH ERROR:", error);
    });

    let secondEvolve;
    if(data.chain.evolves_to.length > 0){
        var secondEvolveArray = [];
        for(i = 0; i < maxSecEvolves; i++){
            secondEvolveArray.push(data.chain.evolves_to[i].species.name);
            //Fetch species of evolves
            let urlSpeciesEvolves = "https://pokeapi.co/api/v2/pokemon/" + secondEvolveArray[i];
            fetch(urlSpeciesEvolves)
            .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE NOT OK");
            }
            })
            .then(function (data) {   
            displaySecondEvolve(data)
            console.log(data)
            })
            .catch((error) => {
            console.error("FETCH ERROR:", error);
            });
        }
    }else{
        secondEvolve = "???"
    }

    let ThirdEvolve;
    if(data.chain.evolves_to.length > 0 && data.chain.evolves_to[0].evolves_to.length > 0 && maxThirdEvolves > 0){
        
        var thirdEvolveArray = [];
        for(i = 0; i < maxThirdEvolves; i++){
            thirdEvolveArray.push(data.chain.evolves_to[0].evolves_to[i].species.name);
            //Fetch species of evolves
            let urlSpeciesEvolves = "https://pokeapi.co/api/v2/pokemon/" + thirdEvolveArray[i];
            fetch(urlSpeciesEvolves)
            .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE NOT OK");
            }
            })
            .then(function (data) {   
            displayLastEvolve(data)
            console.log(data)
            })
            .catch((error) => {
            console.error("FETCH ERROR:", error);
            });
        }
    }else{
        ThirdEvolve = "-";
    }
}

function displayFirstEvolve(data){
    const div = document.getElementById("PKMN_FirstEvolve");
    const secondEvolve = document.createElement("span");
    secondEvolve.innerHTML = "<img class='evolves' src='" + data.sprites.front_default + "'>";
    div.appendChild(secondEvolve);
}

function displaySecondEvolve(data){
    const div = document.getElementById("PKMN_SecondEvolves");
    const secondEvolve = document.createElement("span");
    secondEvolve.innerHTML = "<img class='evolves' src='" + data.sprites.front_default + "'>";
    div.appendChild(secondEvolve);
}

function displayLastEvolve(data){
    const div = document.getElementById("PKMN_LastEvolves");
    const lastEvolve = document.createElement("span");
    lastEvolve.innerHTML = "<img class='evolves' src='" + data.sprites.front_default + "'>";
    div.appendChild(lastEvolve);
}