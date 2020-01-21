const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const newPokemonData = trainer_id => {
  return {
    trainer_id: trainer_id
  };
};

const deletePokemonData = pokemon_id => {
  return {
    id: pokemon_id
  };
};

const configObj = (data, method) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  };
};

const fetchTrainers = () => {
  fetch(TRAINERS_URL)
    .then(parseJson)
    .then(renderTrainers);
};

const renderTrainers = json => {
  const main = document.querySelector("main");
  json.forEach(trainer => {
    main.append(renderTrainer(trainer));
  });
};

const renderTrainer = trainer => {
  const trainerCard = document.createElement("div");
  trainerCard.className = "card";
  trainerCard.dataset.id = trainer.id;

  trainerCard.innerHTML = `<p>${trainer.name}</p>`;
  trainerCard.append(addPokemonBtn(trainer));
  trainerCard.append(renderPokemons(trainer.pokemons));
  return trainerCard;
};

const renderPokemons = pokemons => {
  const ul = document.createElement("ul");
  pokemons.forEach(pokemon => ul.appendChild(renderPokemon(pokemon)));
  return ul;
};

const renderPokemon = pokemon => {
  const trainerCard = document.querySelector(
    `[data-id="${pokemon.trainer_id}"] ul`
  );
  const pokemonName = document.createElement("li");
  pokemonName.innerText = `${pokemon.nickname} (${pokemon.species})`;
  pokemonName.appendChild(releasePokemonBtn(pokemon));
  if (trainerCard) {
    if (pokemon.message != "error") {
      trainerCard.append(pokemonName);
    } else {
      alert('Error while saving Pokemon. Try again later');
    }
  } else {
    return pokemonName;
  }
};

const addPokemonBtn = trainer => {
  const btn = document.createElement("button");
  btn.setAttribute("data-trainer-id", trainer.id);
  btn.innerText = "Add Pokemon";
  btn.addEventListener("click", () => {
    addPokemon(newPokemonData(trainer.id));
  });
  return btn;
};

const addPokemon = data => {
  fetch(POKEMONS_URL, configObj(data, "POST"))
    .then(parseJson)
    .then(renderPokemon);
};

const releasePokemonBtn = pokemon => {
  const btn = document.createElement("button");
  btn.className = "release";
  btn.setAttribute("data-pokemon-id", pokemon.id);
  btn.innerText = "Release";
  btn.addEventListener("click", () => {
    releasePokemon(deletePokemonData(pokemon.id));
  });
  return btn;
};

const releasePokemon = data => {
  fetch(POKEMONS_URL + `/${data.id}`, configObj(data, "DELETE"))
    .then(parseJson)
    .then(removePokemon);
};

const removePokemon = pokemon => {
  if (pokemon.message != "error") {
    const pokemonName = document.querySelector(
      `ul li [data-pokemon-id="${pokemon.id}"]`
    );
    pokemonName.parentElement.remove();
  } else {
    alert("Pokemon couldn't be deleted. Please try later");
  }
};

const parseJson = response => {
  return response.json();
};

document.addEventListener("DOMContentLoaded", () => {
  fetchTrainers();
});
