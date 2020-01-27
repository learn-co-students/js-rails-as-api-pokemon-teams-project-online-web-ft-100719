class PokemonsController < ApplicationController
    def create
        newPoke = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
        render json: newPoke
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.delete
        render json: pokemon
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end
