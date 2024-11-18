class Drink < ApplicationRecord
  has_many :ingredients, dependent: :destroy
  
  validates :name, presence: true
  validates :category, presence: true
  validates :container, presence: true
  validates :instructions, presence: true
  validates :image, presence: true
  
  scope :search_by_name, ->(query) {
    if query.present?
      where('LOWER(name) LIKE ?', "%#{query.downcase}%")
    else
      all
    end
  }
  
  paginates_per 10
end