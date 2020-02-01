require "faker"

class PokemonsController < ApplicationController
  def destroy 
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy 
    
    render json: pokemon, except: [:created_at, :updated_at]
  end 

  def create 
    trainer = Trainer.find_by(id: params[:trainer_id])

    if trainer.pokemon.count == 6 
      return render json: {status: "error", message: "Release a pokemon before adding more to this trainer."}
    end 

    pokemon = trainer.pokemon.build  
    pokemon.nickname = Faker::Name.first_name
    pokemon.species = Faker::Games::Pokemon.name 
    trainer.save 

    render json: pokemon, except: [:created_at, :updated_at]
  end

end

