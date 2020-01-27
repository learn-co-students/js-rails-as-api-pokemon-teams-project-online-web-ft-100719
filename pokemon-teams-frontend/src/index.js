const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let d = document;

d.addEventListener("DOMContentLoaded", () => {
    getTrainers();
})

const populatePokemon = (list, pokemonArray) => {
    pokemonArray.forEach(pokemon => {
        let releaseButton = d.createElement('button')
        releaseButton.setAttribute('class', 'release')
        releaseButton.setAttribute('id', `pokemon${pokemon.id}`)
        releaseButton.textContent = "Release"
        releaseButton.addEventListener("click", releasePokemon)

        let poke = d.createElement('li')
        poke.setAttribute('id', pokemon.id)
        poke.textContent = `${pokemon.nickname}(${pokemon.species})`
        poke.appendChild(releaseButton)

        list.appendChild(poke)
    })
}

function getTrainers() {
    let main = d.querySelector('main')
    return fetch('http://localhost:3000/trainers')
        .then(resp => resp.json())
        .then(allTrainers => {
            allTrainers['data'].forEach(trainer => {
                let trainerInfo = trainer['attributes']
                let div = d.createElement('div')
                div.setAttribute('class', 'card')
                
                let trainerNameHeader = d.createElement('h2')
                trainerNameHeader.textContent = trainerInfo['name']
                div.appendChild(trainerNameHeader)

                let addButton = d.createElement('button')
                addButton.setAttribute('id', trainer.id)
                addButton.textContent = "Add Pokemon"
                
                addButton.addEventListener("click", addPokemon)

                div.appendChild(addButton)

                let pokemonList = d.createElement('ul')
                pokemonList.setAttribute('id', `${trainer.id}pokelist`)
                div.appendChild(pokemonList)

                populatePokemon(pokemonList, trainerInfo['pokemons'])

                

                main.appendChild(div)
                console.log(trainerInfo)
            })
        })
}

function addPokemon(event) {
    let trainerPokeList = d.getElementById(`${event.target.id}pokelist`)
    if (trainerPokeList.children.length < 6){
        fetch('http://localhost:3000/pokemons', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "trainer_id": event.target.id
        })
        }).then(resp => resp.json())
        .then(poke => createPokemon(poke))
    }
}

function createPokemon(pokemon) {
    let releaseButton = d.createElement('button')
    releaseButton.setAttribute('class', 'release')
    releaseButton.setAttribute('id', `pokemon${pokemon.id}`)
    releaseButton.textContent = "Release"
    releaseButton.addEventListener("click", releasePokemon)

    let list = d.getElementById(`${pokemon.trainer_id}pokelist`)
    let pokeLi = d.createElement('li')
    pokeLi.setAttribute('id', pokemon.id)
    pokeLi.textContent = `${pokemon.nickname}(${pokemon.species})`
    pokeLi.appendChild(releaseButton)

    list.appendChild(pokeLi)
}

function releasePokemon(event){
    let pokemonID = event.target.parentNode.id
    fetch(`http://localhost:3000/pokemons/${pokemonID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id: pokemonID
        })
    }).then(resp => resp.json())
      .then(poke => removePokemon(poke))
}

function removePokemon(pokemon){
    let pokeLi = d.getElementById(`${pokemon.id}`)
    pokeLi.parentNode.removeChild(pokeLi)
}