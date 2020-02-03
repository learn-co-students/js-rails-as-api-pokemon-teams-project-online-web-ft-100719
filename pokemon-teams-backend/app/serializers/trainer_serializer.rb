class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attribute :name, :pokemons
  #has_many :pokemons
end
