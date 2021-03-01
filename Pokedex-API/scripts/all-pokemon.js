
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const Region = urlParams.get('region')

// Set variable
let minRegion = 1;
let maxRegion = 151;
let prevRegion = 'galar';
let currentRegion = 'Kanto';
let nextRegion = 'johto'

if(Region == 'kanto'){
  minRegion = 1;
  maxRegion = 151;
  currentRegion = 'kanto';
}else if(Region == 'johto'){
  minRegion = 152;
  maxRegion = 251;
  prevRegion = 'kanto';
  currentRegion = 'johto';
  nextRegion = 'hoenn';
}else if(Region == 'hoenn'){
  minRegion = 252;
  maxRegion = 386;
  prevRegion = 'johto';
  currentRegion = 'hoenn';
  nextRegion = 'sinnoh';
}else if(Region == 'sinnoh'){
  minRegion = 387;
  maxRegion = 493;
  prevRegion = 'hoenn';
  currentRegion = 'sinnoh';
  nextRegion = 'unova';
}else if(Region == 'unova'){
  minRegion = 494;
  maxRegion = 649;
  prevRegion = 'sinnoh';
  currentRegion = 'unova';
  nextRegion = 'kalos';
}else if(Region == 'kalos'){
  minRegion = 650;
  maxRegion = 721;
  prevRegion = 'unova';
  currentRegion = 'kalos';
  nextRegion = 'alola';
}else if(Region == 'alola'){
  minRegion = 722;
  maxRegion = 809;
  prevRegion = 'kalos';
  currentRegion = 'alola';
  nextRegion = 'galar';
}else if(Region == 'galar'){
  minRegion = 810;
  maxRegion = 898;
  prevRegion = 'alola';
  currentRegion = 'galar';
  nextRegion = 'kanto';
}

const pokedex = document.getElementById('allPokemon');

const fetchPokemon = () => {
  const promises = [];
  for (let i = minRegion; i <= maxRegion; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
      const pokemon = results.map((result) => ({
          name: result.name,
          image: result.sprites.other['official-artwork'].front_default,
          type: result.types.map((type) => type.type.name).join(', '),
          id: result.id
      })).sort((a, b) => a.id > b.id ? 1 : -1);
      displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
      .map(
      (singlePokemon) => 
      `<li class="card">
          <a href='pokemon.html?pk=${singlePokemon.id}' /> <img class='singleThumbnail m-3' src='${singlePokemon.image}'> 
          <h3 class="card-title"> ${singlePokemon.name.toUpperCase()} - ${getIndex(singlePokemon)}</h2>
          </a>
      </li>`
      )
      .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

function getIndex(singlePokemon){
  if(singlePokemon.id < 10){
    pokemonIndex = '#00' + singlePokemon.id;
  }else if(singlePokemon.id < 100){
    pokemonIndex = '#0' + singlePokemon.id;
  } else{
    pokemonIndex = '#' + singlePokemon.id;
  }

  return pokemonIndex;
}

//Set previous region
const divPrev = document.getElementById("txtPrev");

  const Previous = document.createElement("span");
  Previous.classList.add("txtSelect");
  Previous.innerHTML = "<a href='index.html?region=" + prevRegion + "'>" + prevRegion.toUpperCase() + "</a>";

  divPrev.appendChild(Previous);

//Set next region
const divNext = document.getElementById("txtNext");

  const Next = document.createElement("span");
  Next.classList.add("txtSelect");
  Next.innerHTML = "<a href='index.html?region=" + nextRegion + "'>" + nextRegion.toUpperCase() + "</a>";

  divNext.appendChild(Next);

//Set heading of region
const divHeading = document.getElementById("Pokedex");

const heading = document.createElement("h3");
  heading.classList.add("text-center");
  heading.innerHTML = 
  currentRegion.toUpperCase() + ": " + getminRegion() + " - " + getmaxRegion();
  divHeading.appendChild(heading);

function getminRegion(){
  let regionMinIndex;
  if(minRegion < 10){
    regionMinIndex = "#00" + minRegion;
  }else{
    regionMinIndex = "#" + minRegion;
  }

  return regionMinIndex;
}

function getmaxRegion(){
  let regionMaxIndex;
  if(maxRegion < 10){
    regionMaxIndex = "#00" + maxRegion;
  }else{
    regionMaxIndex = "#" + maxRegion;
  }

  return regionMaxIndex;
}

fetchPokemon();