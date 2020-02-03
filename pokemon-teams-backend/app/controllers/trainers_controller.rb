class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        # options = {
        #   include: [:pokemons]
        # }
        #binding.pry
        render json: TrainerSerializer.new(trainers)
    end

    # def show
    #     trainer = Trainer.find_by(id: params[:id])
    #     # options = {
    #     #   include: [:pokemons]
    #     # }
    #     render json: TrainerSerializer.new(trainer)
    # end
end



