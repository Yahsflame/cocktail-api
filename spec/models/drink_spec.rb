require 'rails_helper'

RSpec.describe Drink, type: :model do
  it "is valid with valid attributes" do
    drink = build(:drink)
    expect(drink).to be_valid
  end

  it "is not valid without a name" do
    drink = build(:drink, name: nil)
    expect(drink).not_to be_valid
  end

  it "is not valid without a category" do
    drink = build(:drink, category: nil)
    expect(drink).not_to be_valid
  end

  it "is not valid without a container" do
    drink = build(:drink, container: nil)
    expect(drink).not_to be_valid
  end

  it "is not valid without instructions" do
    drink = build(:drink, instructions: nil)
    expect(drink).not_to be_valid
  end

  it "is not valid without an image" do
    drink = build(:drink, image: nil)
    expect(drink).not_to be_valid
  end
end
