require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  let(:drink) { create(:drink) }

  it "is valid with valid attributes" do
    ingredient = build(:ingredient, drink: drink)
    expect(ingredient).to be_valid
  end

  it "is not valid without a name" do
    ingredient = build(:ingredient, name: nil)
    expect(ingredient).not_to be_valid
  end

  it "is not valid without a measurement" do
    ingredient = build(:ingredient, measurement: nil)
    expect(ingredient).not_to be_valid
  end

  it "is not valid without a drink association" do
    ingredient = build(:ingredient, drink: nil)
    expect(ingredient).not_to be_valid
  end
end
