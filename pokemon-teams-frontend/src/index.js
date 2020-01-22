const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
    return fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => addTrainersToPage(json));
};
function addPokemon(trainer) {
    configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainer.id
        })
    };
    fetch(POKEMONS_URL, configObject);
};

function releasePokemon(pokemon) {
    console.log(pokemon);
    let deleteURL = POKEMONS_URL + `/${pokemon.id}`;
    configObject = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id: pokemon.id,
            trainer_id: pokemon.trainer_id
        })
    };

    fetch(deleteURL, configObject);
};

function addTrainersToPage(json) {
    let main = document.querySelector('main');
    main.innerHTML = "";

    json['data'].forEach(trainer => {
        let trainerCard = document.createElement('div');
        trainerCard.className = "card";
        let trainerName = document.createElement('h1');
        trainerName.innerHTML = trainer.attributes.name;
        let pokemonList = document.createElement('ul');
        let pokemons = trainer.attributes.pokemons;

        pokemons.forEach(pokemon => {
            let li = document.createElement('li');
            li.innerHTML = `${pokemon.nickname} the ${pokemon.species}`;
            let releaseButton = document.createElement('button');
            releaseButton.innerHTML = "Release a Pokemon";
            releaseButton.addEventListener('click', () => {
                alert("Release button was clicked!");
                releasePokemon(pokemon);
            });
            li.appendChild(releaseButton);
            pokemonList.appendChild(li);
        })
        let addButton = document.createElement('button');
        addButton.innerHTML = "Add a Pokemon";

        addButton.addEventListener('click', () => {
            alert("Add button was clicked!");
            addPokemon(trainer);
        });
        trainerCard.appendChild(trainerName);
        trainerCard.appendChild(pokemonList);
        trainerCard.appendChild(addButton);
        main.appendChild(trainerCard);
    })

};

fetchTrainers();