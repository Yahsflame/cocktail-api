# app/controllers/api/search_controller.rb
module Api
  class SearchController < ApplicationController
    def index
      query = params[:query]
      page_index = (params[:index] || 0).to_i

      # Enforce a fixed limit of 10 results per page
      limit = 10
      
      # Ensure the page index is non-negative
      page_index = 0 if page_index < 0

      Rails.logger.info "Search params: query=#{query}, page=#{page_index}, limit=#{limit}"
      
      # Retrieve the drinks based on the query with enforced pagination
      @drinks = if query.present?
                  Drink.where('LOWER(name) LIKE ?', "%#{query.downcase}%")
                else
                  Drink.all
                end

      # Get the total count of items for this query before pagination
      total_count = @drinks.count

      # Apply offset and limit for pagination
      offset = page_index * limit
      @drinks = @drinks.offset(offset).limit(limit)
      
      Rails.logger.info "Found #{@drinks.count} drinks (total: #{total_count})"
      
      response_data = {
        drinks: @drinks.map { |drink|
          {
            id: drink.id,
            name: drink.name,
            category: drink.category,
            image: drink.image
          }
        },
        totalCount: total_count
      }
      
      Rails.logger.info "Response data: #{response_data.inspect}"
      render json: response_data
    end
  end
end
