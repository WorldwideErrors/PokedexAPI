const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemon = urlParams.get('pk')
let urlPokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

let rndSeen = Math.floor(Math.random() * 21);
let rndCaught = Math.floor(Math.random() * 21);

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
      errorPokemon();
      errorDisplay();
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
    fetchEvolve(data);
    })
    .catch((error) => {
    fetchSelf();
    console.error("FETCH ERROR Species:", error);
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
        
        console.error("FETCH ERROR Evolves:", error);
        });
}

function errorPokemon(){
    const divNaam = document.getElementById("PKMN_Naam");
    const heading = document.createElement("h3");
    heading.classList.add("unown");
    heading.classList.add("text-center");
    heading.innerHTML = "Unknown Pokemon";
    divNaam.appendChild(heading);
}

function errorEvolve(){

}

function fetchSelf(){

    const urlSelf = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

    fetch(urlSelf)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then(function (data) {   
      console.log(data); 
      displaySelf(data);
    })
    .catch((error) => {
      console.error("FETCH ERROR Self:", error);
    });
}

function displaySelf(data){
    const div = document.getElementById("PKMN_FirstEvolve");
    const firstEvolve = document.createElement("span");
    firstEvolve.innerHTML = "<img class='evolves' src='" + data.sprites.front_default + "'>";
    div.appendChild(firstEvolve);
}

function makeUnknown() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < getRandomInt(); i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

function getRandomInt(){
    let randomInt = Math.floor(Math.random() * 10) + 3;
    return randomInt
}

function errorDisplay(){
    const divInfo1 = document.getElementById("PKMN_Info1");
    const divInfo2 = document.getElementById("PKMN_Info2");
    const divInfo3 = document.getElementById("PKMN_Info3");
    const divInfo4 = document.getElementById("PKMN_Info4");
    let rValue = Math.random().toString(26).substring(7);

    const info_Type1 = document.createElement("td");
    info_Type1.classList.add("information");
    info_Type1.classList.add("p-2");
    info_Type1.classList.add("text-center");
    info_Type1.classList.add("align-middle");
    info_Type1.innerHTML = "<span class='unown'>" + makeUnknown() + "</span>"; 

    const info_Type2 = document.createElement("td");
    info_Type2.classList.add("information");
    info_Type2.classList.add("p-2");
    info_Type2.classList.add("text-center");
    info_Type2.classList.add("align-middle");
    info_Type2.innerHTML = "<span class='unown'>" + makeUnknown() + "</span>"; 

    const info_Weight = document.createElement("td");
    info_Weight.classList.add("information");
    info_Weight.classList.add("p-2");
    info_Weight.classList.add("text-center");
    info_Weight.classList.add("align-middle");
    info_Weight.innerHTML = "Weight: <br/>" + "<span class='unown'>" + makeUnknown() + "</span>" + " kg"; 

    const info_Height = document.createElement("td");
    info_Height.classList.add("information");
    info_Height.classList.add("p-2");
    info_Height.classList.add("text-center");
    info_Height.classList.add("align-middle");
    info_Height.innerHTML = "Height: <br/>" + "<span class='unown'>" + makeUnknown() + "</span>" + " m"; 

    const info_Seen = document.createElement("td");
    info_Seen.classList.add("information");
    info_Seen.classList.add("p-2");
    info_Seen.classList.add("text-center");
    info_Seen.classList.add("align-middle");
    info_Seen.innerHTML = "Seen: " + "<span class='unown'>" + makeUnknown() + "</span>"; 

    const info_Caught = document.createElement("td");
    info_Caught.classList.add("information");
    info_Caught.classList.add("p-2");
    info_Caught.classList.add("text-center");
    info_Caught.classList.add("align-middle");
    info_Caught.innerHTML = "Caught: " + "<span class='unown'>" + makeUnknown() + "</span>"; 
    
    const info_BaseEXP = document.createElement("td");
    info_BaseEXP.classList.add("information");
    info_BaseEXP.classList.add("p-2");
    info_BaseEXP.classList.add("text-center");
    info_BaseEXP.classList.add("align-middle");
    info_BaseEXP.innerHTML = "Base Exp: <br/>" + "<span class='unown'>" + makeUnknown() + "</span>"; 

    const info_Abilities = document.createElement("td");
    info_Abilities.classList.add("information");
    info_Abilities.classList.add("p-2");
    info_Abilities.classList.add("text-center");
    info_Abilities.classList.add("align-middle");
    info_Abilities.innerHTML = "Abilities: <br/>" + "<span class='unown'>" + makeUnknown() + "</span>"; 

    divInfo1.appendChild(info_Weight);
    divInfo2.appendChild(info_Height);
    divInfo3.appendChild(info_Seen);
    divInfo4.appendChild(info_Type1);
    divInfo1.appendChild(info_BaseEXP);
    divInfo2.appendChild(info_Abilities);
    divInfo3.appendChild(info_Caught);
    divInfo4.appendChild(info_Type2);

    const divIMG = document.getElementById("PKMN_IMG");
    const images = document.createElement("p");
    images.innerHTML = "<img class='picture' src='../images/unknown.png'>";
    
    divIMG.appendChild(images);
}

function displayData(data){
    const divNaam = document.getElementById("PKMN_Naam");
    const divInfo1 = document.getElementById("PKMN_Info1");
    const divInfo2 = document.getElementById("PKMN_Info2");
    const divInfo3 = document.getElementById("PKMN_Info3");
    const divInfo4 = document.getElementById("PKMN_Info4");
    const divIMG = document.getElementById("PKMN_IMG");
    // const div2 = document.getElementById("");

    // Variables
    let pokemon_name = data.name.toUpperCase();;
    
    let index;

    let type1;
    let type2;
    let Poketype2;
    
    let weight;
    let height;

    let baseEXP;
    let maxAbilities = data.abilities.length;
    let ability;

    let front_female;
    let back_female;

    // 1e type vullen
    type1 = data.types[0].type.name;
    const Poketype1 = type1.charAt(0).toUpperCase() + type1.slice(1);

    // 2e type vullen
    if(data.types.length > 1){
        type2 = data.types[1].type.name;
        Poketype2 = type2.charAt(0).toUpperCase() + type2.slice(1);
    }else{
        type2 = "unknown";
        Poketype2 = type2.charAt(0).toUpperCase() + type2.slice(1);
    }

    // Index vullen

    if(data.id > 0){
        index = data.id;
        if (index < 10){
            index = "#00" + index;
        }else if (index < 100){
            index = "#0" + index;
        }else{
            index = "#" + index;
        }
    }
    else if(data.id != null){
        index = data.id;
        if (index < 10){
            index = "#00" + index;
        }else if (index < 100){
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

    // Vullen baseexperience
    baseEXP = data.base_experience;

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

    const art = data.sprites.other["official-artwork"].front_default;
    
    const heading = document.createElement("h3");
    heading.classList.add("text-center");
    heading.innerHTML = 
    pokemon_name + " - " + index;
    divNaam.appendChild(heading);

    const info_Type1 = document.createElement("td");
    info_Type1.classList.add("information");
    info_Type1.classList.add("p-2");
    info_Type1.classList.add("text-center");
    info_Type1.classList.add("align-middle");
    info_Type1.classList.add(type1);
    info_Type1.innerHTML = Poketype1; 

    const info_Type2 = document.createElement("td");
    info_Type2.classList.add("information");
    info_Type2.classList.add("p-2");
    info_Type2.classList.add("text-center");
    info_Type2.classList.add("align-middle");
    info_Type2.classList.add(type2);
    info_Type2.innerHTML = Poketype2; 

    const info_Weight = document.createElement("td");
    info_Weight.classList.add("information");
    info_Weight.classList.add("p-2");
    info_Weight.classList.add("text-center");
    info_Weight.classList.add("align-middle");
    info_Weight.innerHTML = "Weight: <br/>" + decimalWeight + " kg"; 

    const info_Height = document.createElement("td");
    info_Height.classList.add("information");
    info_Height.classList.add("p-2");
    info_Height.classList.add("text-center");
    info_Height.classList.add("align-middle");
    info_Height.innerHTML = "Height: <br/>" + decimalHeight + " m"; 

    const info_Seen = document.createElement("td");
    info_Seen.classList.add("information");
    info_Seen.classList.add("p-2");
    info_Seen.classList.add("text-center");
    info_Seen.classList.add("align-middle");
    info_Seen.innerHTML = "Seen: " + rndSeen; 

    const info_Caught = document.createElement("td");
    info_Caught.classList.add("information");
    info_Caught.classList.add("p-2");
    info_Caught.classList.add("text-center");
    info_Caught.classList.add("align-middle");
    info_Caught.innerHTML = "Caught: " + rndCaught; 
    
    const info_BaseEXP = document.createElement("td");
    info_BaseEXP.classList.add("information");
    info_BaseEXP.classList.add("p-2");
    info_BaseEXP.classList.add("text-center");
    info_BaseEXP.classList.add("align-middle");
    info_BaseEXP.innerHTML = "Base Exp: <br/>" + baseEXP; 

    const info_Abilities = document.createElement("td");
    info_Abilities.classList.add("information");
    info_Abilities.classList.add("p-2");
    info_Abilities.classList.add("text-center");
    info_Abilities.classList.add("align-middle");
    info_Abilities.innerHTML = "Abilities: <br/>" + ability; 

    divInfo1.appendChild(info_Weight);
    divInfo2.appendChild(info_Height);
    divInfo3.appendChild(info_Seen);
    divInfo4.appendChild(info_Type1);
    divInfo1.appendChild(info_BaseEXP);
    divInfo2.appendChild(info_Abilities);
    divInfo3.appendChild(info_Caught);
    divInfo4.appendChild(info_Type2);

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

    let firstEvolve = data.chain.species.name; ;

    //Fetch species of evolves
    let urlSpeciesEvolves = "https://pokeapi.co/api/v2/pokemon/" + firstEvolve;
    fetch(urlSpeciesEvolves)
    .then((response) => {
    if (response.ok) {
        return response.json();
    }else {
        throw new Error("NETWORK RESPONSE NOT OK");
    }
    })
    .then(function (data) {   
    displayFirstEvolve(data)
    console.log(data)
    })
    .catch((error) => {
    fetchSelf();
    console.error("FETCH ERROR:", error);
    });

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
            }else {
                throw new Error("NETWORK RESPONSE NOT OK");
            }
            })
            .then(function (data) {   
            displayLastEvolve(data);
            console.log(data);
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
    const firstEvolve = document.createElement("span");
    firstEvolve.innerHTML = "<img class='evolves' src='" + data.sprites.front_default + "'>";
    div.appendChild(firstEvolve);
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

function errorHandel(){
    const div = document.getElementById("PKMN_FirstEvolve");
    const errorhandling = document.createElement("span");
    errorhandling.innerHTML = "<p> Er is iets fout gegaan!</p>";
    div.appendChild(errorhandling);
}