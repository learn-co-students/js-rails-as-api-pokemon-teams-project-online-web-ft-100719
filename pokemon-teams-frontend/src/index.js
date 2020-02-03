const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// const TRAINER_POKEMONS_URL = `${BASE_URL}/trainer_pokemons`

document.addEventListener("DOMContentLoaded", ()=>{
    getTrainerTeams();
  })

function getTrainerTeams() {

    fetch(TRAINERS_URL)
    .then((response) => response.json())
    .then((data) => {
        console.log('what is data?', data)
        data.data.forEach((trainerTeam) => {
            renderTeam(trainerTeam)});
        //console.log("loop thru and process")
    }); 
}

function renderTeam(myTrainer) {
    
    let main = document.querySelector("main");

    let trainerCard = document.createElement('div');
    trainerCard.setAttribute('class', 'card');
    trainerCard.dataset.id = myTrainer.id

    let p = document.createElement('p');
    p.innerText = `${myTrainer.attributes.name}`;

    let add_btn = document.createElement("button");
    //add_btn.dataset.id = myTrainer.id
    add_btn.setAttribute("data-trainer-id", myTrainer.id);
    add_btn.innerText = "Add Pokemon"
    add_btn.addEventListener('click', (e) => {
        //console.log(e.target.dataset);
        addPokemon(e)
      });

    let ul = document.createElement('ul');
    myTrainer.attributes.pokemons.forEach((pokemon) => {
      li=document.createElement('li');
      //<li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
      li.innerHTML = pokemon.species;
      li.innerHTML += ` (${pokemon.nickname}) `;
      rel_btn = document.createElement("button");
      rel_btn.setAttribute("data-pokemon-id", pokemon.id);
      rel_btn.setAttribute("data-trainer-id", myTrainer.id);
      rel_btn.setAttribute('class', 'release');
      rel_btn.innerText = "Release"
      rel_btn.addEventListener('click', (e) => {
        //console.log(e.target.dataset);
        releasePokemon(e)
      });
      li.append(rel_btn)
      ul.appendChild(li);
      trainerCard.append(p, add_btn, ul);
      main.appendChild(trainerCard);

    })

    function releasePokemon(poke){
        poke.preventDefault();
        pokeId = poke.target.dataset.pokemonId;
        trainerId = poke.target.dataset.trainerId;
        pokeObj = {id: pokeId}
        delete_url = `${POKEMONS_URL}/${pokeId}`

        let configObj = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
        };
           
        fetch(delete_url, configObj)
        .then(window.location.reload());
    }

    function addPokemon(poke){
        poke.preventDefault();
        trainerId = poke.target.dataset.trainerId
        trainerObj = { "trainer_id": trainerId }

        
        let configObj = {
            method: "POST",
            body: JSON.stringify(trainerObj),
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
        };
           
        fetch(POKEMONS_URL, configObj)
        .then(window.location.reload());

    }
    
}
