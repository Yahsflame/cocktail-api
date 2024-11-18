FactoryBot.define do
  factory :ingredient do
    name { "Rum" }
    measurement { "2 oz" }
    association :drink
  end
end