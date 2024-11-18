FactoryBot.define do
  factory :drink do
    name { "Mojito" }
    category { "Cocktail" }
    container { "Highball glass" }
    instructions { "Muddle mint leaves with sugar and lime juice. Add rum and top with soda water." }
    image { "mojito.jpg" }

    trait :non_alcoholic do
      category { "Mocktail" }
    end
  end
end
