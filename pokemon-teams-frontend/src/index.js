const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function loadTrainers(){
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => showTrainers(trainers))
    .catch(error => console.log(error.message))
}

function showTrainers(trainers){
  let main = document.getElementsByTagName("main")[0]
  for (i = 0; i < trainers.length; i++) {
    let trainerCard = document.createElement("div")
    trainerCard.classList.add("card")
    trainerCard.setAttribute("data-id",trainers[i]["id"])

    let p = document.createElement("p")
    p.innerText = trainers[i]["name"]
    trainerCard.appendChild(p)

    let button = document.createElement("button")
    button.setAttribute("data-trainer-id", trainers[i]["id"])
    button.innerText = "Add Pokemon"
    button.addEventListener("click", () => {
      let trainerId = button.attributes["data-trainer-id"].value
      addNewPokemon(trainerId)
    })
    trainerCard.appendChild(button)

    let pokemonList = document.createElement("ul")

    trainers[i].pokemon.forEach(pokemon => {
      let pokemonLi = document.createElement("li")
      pokemonLi.innerText = `${pokemon["nickname"]} (${pokemon["species"]})`
      let pokeButton = document.createElement("button")
      pokeButton.innerText = "Release"
      pokeButton.classList.add("release")
      pokeButton.setAttribute("data-pokemon-id", pokemon["id"])
      pokeButton.addEventListener("click", () => {
        releasePokemon(pokemon["id"])
        pokemonLi.remove()
      })
      pokemonLi.appendChild(pokeButton)
      pokemonList.appendChild(pokemonLi)
    });

    trainerCard.appendChild(pokemonList)
    main.appendChild(trainerCard)
  }
} 

// Delete pokemon from trainer 
function releasePokemon(pokemonId){
 fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
   method: 'DELETE',
   headers: {
     "Content-Type": "application/json",
     "Accept": "application/json"
   }
 })
  .then(resp => resp.json())
  .then(json => console.log(json))
}

//create new pokemon for trainer 
function addNewPokemon(trainerId){
  fetch("http://localhost:3000/pokemons", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
   }, 
   body: JSON.stringify({"trainer_id": trainerId})
  })
    .then(resp => resp.json())
    .then(json => console.log(json))
}

function appendPokemon(pokemon){
  // do some stuff
}

// Do ALL THE THINGS
document.addEventListener("DOMContentLoaded", () => {
  // stuff happens here! 
  loadTrainers();
})