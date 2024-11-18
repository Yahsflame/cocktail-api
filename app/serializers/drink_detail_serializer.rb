class DrinkDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :container, :instructions, :image, :ingredients

  def ingredients
    object.ingredients.map do |ingredient|
      {
        name: ingredient.name,
        measurement: ingredient.measurement
      }
    end
  end
end