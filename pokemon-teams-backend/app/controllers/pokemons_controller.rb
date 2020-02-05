class PokemonsController < ApplicationController
  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    poke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: poke, except: [:created_at, :updated_at]
  end

  def destroy
    poke = Pokemon.destroy(params[:id])
    render json: poke, except: [:created_at, :updated_at]
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end
end
