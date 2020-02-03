class PokemonsController < ApplicationController
    
    # def index
    #     pokemons = Pokemon.all
    #     # options = {
    #     #   include: [:trainer]
    #     # }
    #     render json: PokemonSerializer.new(pokemons)
    # end

    # def show
    #     pokemon = Pokemon.find_by(id: params[:id])
    #     # options = {
    #     #   include: [:trainer]
    #     # } 
    #     render json: PokemonSerializer.new(pokemon)
    # end
    
    def create
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      trainer_id = params[:trainer_id]

      # Find the trainer. Check how many pokemons they already have.
      # If 6 or more, display error message that you cant create more
      
      trainer = Trainer.find_by(id: trainer_id) 
      if  trainer && trainer.pokemons.count < 6
            #binding.pry
            Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
      end
    end

    def destroy
        poke = Pokemon.find_by(id: params[:id])
        
        poke.destroy if poke 

    end

end
