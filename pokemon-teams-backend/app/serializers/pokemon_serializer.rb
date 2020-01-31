class PokemonSerializer < ActiveModel::PokemonSerializer
  attributes :id, :nickname, :species, :trainer_id
end