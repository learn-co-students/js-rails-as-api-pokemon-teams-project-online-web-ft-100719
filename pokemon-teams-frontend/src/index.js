const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
      trainers.forEach(trainer => {
        document.querySelector("main").appendChild(makeTrainerCard(trainer))
      })
    })
})



function makeTrainerCard(trainer) {
  const card_div = makeTrainerContainer(trainer)

  card_div.appendChild(makeTitlePTag(trainer))

  card_div.appendChild(makeAddPokemonButton(trainer))

  card_div.appendChild(makePokemonList(trainer))

  return card_div
}

function makeTrainerContainer(trainer) {
  const card_div = document.createElement('div')
  card_div.classList.add('card')
  card_div.setAttribute('data-id', trainer.id)
  return card_div
}

function makeTitlePTag(trainer) {
  const trainer_name = document.createElement('p')
  trainer_name.textContent = trainer.name
  return trainer_name
}

function makeAddPokemonButton(trainer) {
  const add_pokemon_button = document.createElement('button')
  add_pokemon_button.setAttribute('data-trainer-id', trainer.id)
  add_pokemon_button.textContent = 'Add Pokemon'

  addOnClickPokemonCreationToNode(add_pokemon_button)

  return add_pokemon_button
}

function addOnClickPokemonCreationToNode(node) {
  node.addEventListener("click", (e) => {
    const trainer_id = e.target.getAttribute("data-trainer-id")
    const configurationObject = makeConfigurationObject("POST", { "trainer_id": trainer_id })

    fetch(TRAINERS_URL + `/${trainer_id}/pokemons`, configurationObject)
      .then(resp => resp.json())
      .then(pokemon => {
        if (pokemon.message) {
          alert(pokemon.message)
        }
        else {
          e.target.parentElement.querySelector("ul").appendChild(makePokemonLi(pokemon))
        }
      })
  })
}

function makeConfigurationObject(method, body = null) {
  const configObject = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  if (body || body === 0) {
    configObject[body] = JSON.stringify(body)
  }
  return configObject
}

function makePokemonLi(pokemon) {
  pokeLi = document.createElement('li')
  pokeLi.textContent = `${pokemon.nickname} (${pokemon.species})`
  pokeLi.appendChild(makeReleaseButton(pokemon))
  return pokeLi
}

function makeReleaseButton(pokemon) {
  release_button = document.createElement('button')
  release_button.classList.add("release")
  release_button.setAttribute('data-pokemon-id', pokemon.id)
  release_button.textContent = 'Release'
  addOnClickPokemonDeletionToNode(release_button)
  return release_button
}

function addOnClickPokemonDeletionToNode(node) {
  node.addEventListener("click", (e) => {
    const configurationObject = makeConfigurationObject("DELETE")

    fetch(`${POKEMONS_URL}/${e.target.getAttribute("data-pokemon-id")}`, configurationObject)
      .then(resp => resp.json())
      .then((pokemon) => {
        li = e.target.parentElement
        li.parentElement.removeChild(li)
      })
  })
}

function makePokemonList(trainer) {
  ul = document.createElement("ul")
  trainer.pokemons.forEach(pokemon => {
    ul.appendChild(makePokemonLi(pokemon))
  })
  return ul
}


