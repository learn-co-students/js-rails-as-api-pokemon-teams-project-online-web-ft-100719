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
    trainerCard.appendChild(button)

    let pokemonList = document.createElement("ul")

    console.log(trainers[i].pokemon)
    trainers[i].pokemon.forEach(pokemon => {
      let pokemonLi = document.createElement("li")
      pokemonLi.innerText = `${pokemon["nickname"]} (${pokemon["species"]})`
      let pokeButton = document.createElement("button")
      pokeButton.innerText = "Release"
      pokeButton.classList.add("release")
      pokeButton.setAttribute("data-pokemon-id", pokemon["id"])
      pokemonLi.appendChild(pokeButton)

      pokemonList.appendChild(pokemonLi)
    });

    trainerCard.appendChild(pokemonList)
    main.appendChild(trainerCard)
  }
} 


// Do ALL THE THINGS
document.addEventListener("DOMContentLoaded", () => {
  // stuff happens here! 
  loadTrainers();
})