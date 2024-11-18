class DrinkSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :image
end