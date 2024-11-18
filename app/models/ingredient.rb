class Ingredient < ApplicationRecord
  belongs_to :drink
  
  validates :name, presence: true
  validates :measurement, presence: true
end