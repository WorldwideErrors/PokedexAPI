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
      displayDataPokemon(data);
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
    getCaptureRate(data);
    getBaseHappiness(data);
    getClassification(data);
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
        displayEvolveError();
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
    var textUnknown = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < getRandomInt(); i++)
      textUnknown += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return textUnknown;
}

function getRandomInt(){
    let randomInt = Math.floor(Math.random() * 10) + 3;
    return randomInt;
}

function errorDisplay(){
    const divInfo1 = document.getElementById("PKMN_Info1");
    const divInfo2 = document.getElementById("PKMN_Info2");
    const divInfo3 = document.getElementById("PKMN_Info3");
    const divInfo4 = document.getElementById("PKMN_Info4");
    const divInfo5 = document.getElementById("PKMN_Info5");

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

    const div = document.getElementById("PKMN_FirstEvolve");
    const firstEvolve = document.createElement("span");
    firstEvolve.innerHTML = "<img class='evolves' src='../images/unknown.png'>";
    div.appendChild(firstEvolve);
}

function displayEvolveError(){
    const div = document.getElementById("PKMN_FirstEvolve");
    const firstEvolve = document.createElement("span");
    firstEvolve.innerHTML = "<img class='evolves' src='../images/unknown.png'>";
    div.appendChild(firstEvolve);
}

function displayDataPokemon(data){
    
    // Invullen van data uit Pokemon API - pokemon'
    getSelectors(data);
    getName(data);
    getThumbnail(data);
    getHeight(data);
    getWeight(data);
    getBaseEXP(data);
    getAbilities(data);
    getSeen();
    getCaught();
    getType1(data);
    getType2(data);
}

// Functie ophalen en tonen link naar andere pokemons
function getSelectors(data){
    
    // PREVIOUS POKEMON
    let prevPokemon = data.id -1;
    const urlPrevPokemon = "https://pokeapi.co/api/v2/pokemon/" + prevPokemon;

    fetch(urlPrevPokemon)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then(function (data) {   
      console.log(data); 

      let prevName;
      let prevLink;

      if(prevPokemon > 1){
        prevLink = prevPokemon;
      }else{
        prevLink = 1;
      }
      
      if(prevPokemon > 0){
        prevName = data.name.toUpperCase();
        if (prevPokemon < 10){
            prevPokemon = "#00" + prevPokemon;
        }else if (prevPokemon < 100){
            prevPokemon = "#0" + prevPokemon;
        }else{
            prevPokemon = "#" + prevPokemon;
        }
      }

      const divPrev = document.getElementById("txtPrev");

      const Previous = document.createElement("span");
      Previous.classList.add("txtSelect");
      Previous.innerHTML = "<a href='pokemon.html?pk=" + prevLink + "'>" + prevName + " - " + prevPokemon+ "</a>";

      divPrev.appendChild(Previous);
    })
    .catch((error) => {
      let prevPokemon = "#898";
      let prevName = "CALYREX";

      const divPrev = document.getElementById("txtPrev");
      prevLink = 898;

      const Previous = document.createElement("span");
      Previous.classList.add("txtSelect");
      Previous.innerHTML = "<a href='pokemon.html?pk=" + prevLink + "'>" + prevName + " - " + prevPokemon+ "</a>";

      divPrev.appendChild(Previous);
      console.error("FETCH ERROR:", error);
    });
    
    // NEXT POKEMON
    let nextPokemon = data.id + 1;
    const urlNextPokemon = "https://pokeapi.co/api/v2/pokemon/" + nextPokemon;

    fetch(urlNextPokemon)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then(function (data) {   
      console.log(data); 

      let nextName;
      let nextLink;

      if(nextPokemon > 1){
        nextLink = nextPokemon;
      }else{
        nextLink = 1;
      }
      
      if(nextPokemon > 0){
        nextName = data.name.toUpperCase();
        if (nextPokemon < 10){
            nextPokemon = "#00" + nextPokemon;
        }else if (nextPokemon < 100){
            nextPokemon = "#0" + nextPokemon;
        }else{
            nextPokemon = "#" + nextPokemon;
        }
      }

      const divNext = document.getElementById("txtNext");

      const Next = document.createElement("span");
      Next.classList.add("txtSelect");
      Next.innerHTML = "<a href='pokemon.html?pk=" + nextLink + "'>" + nextName + " - " + nextPokemon+ "</a>";

      divNext.appendChild(Next);
    })
    .catch((error) => {
      let prevPokemon = "#001";
      let prevName = "BULBASAUR";

      const divPrev = document.getElementById("txtNext");
      prevLink = 1;

      const Previous = document.createElement("span");
      Previous.classList.add("txtSelect");
      Previous.innerHTML = "<a href='pokemon.html?pk=" + prevLink + "'>" + prevName + " - " + prevPokemon+ "</a>";

      divPrev.appendChild(Previous);
      console.error("FETCH ERROR:", error);
    });
}

// Functie ophalen en tonen pokemon naam
function getName(data){
    const div = document.getElementById("PKMN_Naam");
    
    // Variables
    let pokemon_name = data.name.toUpperCase();
    
    let index;

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

    const heading = document.createElement("h3");
    heading.classList.add("text-center");
    heading.innerHTML = 
    pokemon_name + " - " + index;
    div.appendChild(heading);
}

// Functie ophalen en tonen pokemon thumbnail
function getThumbnail(data){
    const div = document.getElementById("PKMN_IMG");

    // Afbeelding instellen
    const art = data.sprites.other["official-artwork"].front_default;
    
    const images = document.createElement("p");
    images.innerHTML = "<img class='picture' src='" + art + "'>";

    div.appendChild(images);
}

// Functie ophalen en tonen pokemon lengte
function getHeight(data){
    const divInfo = document.getElementById("PKMN_Height");

    // Vullen lengte
    let height = data.height / 10;
    const decimalHeight = height.toFixed(1);

    const info_Height = document.createElement("span");
    info_Height.innerHTML = "Height: <br/>" + decimalHeight + " m"; 

    divInfo.appendChild(info_Height);
}

// Functie ophalen en tonen pokemon gewicht
function getWeight(data){
    const divInfo = document.getElementById("PKMN_Weight");

    // Vullen gewicht
    let weight = data.weight / 10;
    var decimalWeight = weight.toFixed(1);
    
    const info_Weight = document.createElement("span");
    info_Weight.innerHTML = "Weight: <br/>" + decimalWeight + " kg"; 

    divInfo.appendChild(info_Weight);
}

// Functie ophalen en tonen pokemon basis experience
function getBaseEXP(data){
    const divInfo = document.getElementById("PKMN_BaseEXP");

    // Vullen baseexperience
    const baseEXP = data.base_experience;

    const info_BaseEXP = document.createElement("span");
    info_BaseEXP.innerHTML = "Base Exp: <br/>" + baseEXP; 

    divInfo.appendChild(info_BaseEXP);
}

// Functie ophalen en tonen pokemon basis vreugd
function getBaseHappiness(data){
    const divInfo = document.getElementById("PKMN_BaseHappiness");

    const info_BaseHappiness = document.createElement("span");
    info_BaseHappiness.innerHTML = "Base Happiness: <br/>" + data.base_happiness;
    divInfo.appendChild(info_BaseHappiness); 
}

// Functie ophalen en tonen aantal gezien (Random)
function getSeen(){
    const divInfo = document.getElementById("PKMN_Seen");

    const info_Seen = document.createElement("span");
    info_Seen.innerHTML = "Seen: <br/>" + rndSeen; 

    divInfo.appendChild(info_Seen);
    
}

// Functie ophalen en tonen aantal gevangen (Random)
function getCaught(){
    const divInfo = document.getElementById("PKMN_Caught");

    const info_Caught = document.createElement("span");
    info_Caught.innerHTML = "Caught: <br/>" + rndCaught; 

    divInfo.appendChild(info_Caught);
}

// Functie ophalen en tonen pokemon type 1
function getType1(data){

    const divInfo = document.getElementById("PKMN_Types");

    // 1e type vullen
    type1 = data.types[0].type.name;
    const Poketype1 = type1.charAt(0).toUpperCase() + type1.slice(1);
    
    const info_Type1 = document.createElement("td");
    info_Type1.classList.add("information");
    info_Type1.classList.add("p-2");
    info_Type1.classList.add("text-center");
    info_Type1.classList.add("align-middle");
    info_Type1.classList.add(type1);
    info_Type1.innerHTML = Poketype1; 

    divInfo.appendChild(info_Type1);
}

// Functie ophalen en tonen pokemon type 2
function getType2(data){
    
    const divInfo = document.getElementById("PKMN_Types");
    
    // 2e type vullen
    if(data.types.length > 1){
        type2 = data.types[1].type.name;
        Poketype2 = type2.charAt(0).toUpperCase() + type2.slice(1);
    }else{
        type2 = "unknown";
        Poketype2 = type2.charAt(0).toUpperCase() + type2.slice(1);
    }
    
    const info_Type2 = document.createElement("td");
    info_Type2.classList.add("information");
    info_Type2.classList.add("p-2");
    info_Type2.classList.add("text-center");
    info_Type2.classList.add("align-middle");
    info_Type2.classList.add(type2);
    info_Type2.innerHTML = Poketype2; 

    divInfo.appendChild(info_Type2);
}

// Functie ophalen en tonen pokemon capture rate
function getCaptureRate(data){
    const divInfo = document.getElementById("PKMN_CaptureRate");
    
    const info_CaptureRate = document.createElement("span");
    info_CaptureRate.innerHTML = "Capture Rate: <br/>" + data.capture_rate; 

    divInfo.appendChild(info_CaptureRate);
}

// Functie ophalen en tonen pokemon abilities
function getAbilities(data){

    const divInfo = document.getElementById("PKMN_Abilities");
    let maxAbilities = data.abilities.length;
    let ability;

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

    const info_Abilities = document.createElement("span");
    info_Abilities.innerHTML = "Abilities: <br/>" + ability; 

    divInfo.appendChild(info_Abilities);
}

// Functie ophalen en tonen pokemon basis experience
function getClassification(data){
    const divInfo = document.getElementById("PKMN_Classification");

    // Vullen baseexperience
    const Genus = data.genera[7].genus;

    const info_Genus = document.createElement("span");
    info_Genus.innerHTML = "Classification: <br/>" + Genus; 

    divInfo.appendChild(info_Genus);
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
        for(i = 0; i < maxSecEvolves; i++){
            for(j = 0; j < maxThirdEvolves; j++){
                thirdEvolveArray.push(data.chain.evolves_to[i].evolves_to[j].species.name);
                //Fetch species of evolves
                let urlSpeciesEvolves;
                if(j > 0){
                    urlSpeciesEvolves = "https://pokeapi.co/api/v2/pokemon/" + thirdEvolveArray[j];
                }else{
                    urlSpeciesEvolves = "https://pokeapi.co/api/v2/pokemon/" + thirdEvolveArray[i];
                }
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