const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function () {
  fetch(TRAINERS_URL)
    .then(function (response) {
      return response.json()
    })
    .then(function (trainers) {
      for (trainer of trainers) {
        addTrainerToDOM(trainer)
      }
    })

  function addTrainerToDOM(trainer) {
    const div = document.createElement('div')
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', trainer.id)
    const p = document.createElement('p')
    p.innerHTML = trainer.name
    div.appendChild(p)
    const addPokemonButton = document.createElement('button')
    const ul = document.createElement('ul')
    addPokemonButton.setAttribute('data-trainer-id', trainer.id)
    addPokemonButton.addEventListener('click', function () {
      addPokemon(trainer, ul)
    })
    addPokemonButton.innerHTML = "Add Pokemon"
    div.appendChild(addPokemonButton)
    for (pokemon of trainer.pokemons) {
      createPokemon(pokemon, ul)
    }
    div.appendChild(ul)
    document.getElementsByTagName('main')[0].appendChild(div)
  }

  function addPokemon(trainer, ul) {
    if (trainer.pokemons.length == 6) {
      alert("Can't add more pokemon to this team")
    } else {
      let configObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ trainer_id: trainer.id })
      }
      fetch(POKEMONS_URL, configObject)
        .then(function (response) {
          return response.json()
        })
        .then(function (pokemon) {
          createPokemon(pokemon, ul)
        })
    }
  }

  function release(pokemon, li) {
    let configObject = {
      method: 'DELETE'
    }
    fetch(`${POKEMONS_URL}/${pokemon.id}`, configObject)
      .then(function (response) {
        return response.json()
      })
      .then(function (deleted) {
        console.log(deleted)
        li.parentNode.removeChild(li)
      })
  }

  function createPokemon(pokemon, ul) {
    const li = document.createElement('li')
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    const button = document.createElement('button')
    button.setAttribute('class', 'release')
    button.setAttribute('data-pokemon-id', pokemon.id)
    button.innerHTML = "Release"
    button.addEventListener('click', function () {
      release(pokemon, li)
    })
    li.appendChild(button)
    ul.appendChild(li)
  }
})