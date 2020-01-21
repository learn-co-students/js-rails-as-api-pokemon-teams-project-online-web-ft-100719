class PokemonsController < ApplicationController
  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    trainer = Trainer.find_by(id:params[:trainer_id])
    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])
    if trainer.pokemons.count < 6 && pokemon.save
      render json: pokemon
    else
      render json: { message: "error", trainer_id: params[:trainer_id] }
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id:params[:id])
    if pokemon.destroy
      render json: pokemon
    else
      render json: { message: "error"}
    end
  end
end
