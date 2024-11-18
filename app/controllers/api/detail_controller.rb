module Api
  class DetailController < ApplicationController
    def show
      drink_id = params[:id]

      if drink_id.blank?
        render json: { error: "Drink ID is required" }, status: :bad_request
        return
      end

      @drink = Drink.find_by(id: drink_id)

      if @drink.nil?
        render json: { error: "Drink not found" }, status: :not_found
        return
      end

      response_data = {
        id: @drink.id,
        name: @drink.name,
        category: @drink.category,
        container: @drink.container,
        image: @drink.image,
        ingredients: @drink.ingredients&.map do |ingredient|
          {
            name: ingredient.name,
            measurement: ingredient.measurement
          }
        end || [],
        instructions: @drink.instructions
      }

      # Explicitly render JSON without involving ActiveModelSerializers
      render json: response_data, status: :ok
    rescue => e
      Rails.logger.error("Error fetching drink details: #{e.message}")
      render json: { error: "Internal Server Error" }, status: :internal_server_error
    end
  end
end
