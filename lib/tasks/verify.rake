# lib/tasks/verify.rake
namespace :data do
  desc "Verify database content"
  task verify: :environment do
    puts "\n=== Database Content Verification ==="
    puts "Total drinks: #{Drink.count}"
    puts "Total ingredients: #{Ingredient.count}"
    
    if Drink.any?
      puts "\nSample Drinks:"
      Drink.limit(3).each do |drink|
        puts "\n#{drink.name}:"
        puts "ID: #{drink.id}"
        puts "Category: #{drink.category}"
        puts "Ingredients:"
        drink.ingredients.each do |ingredient|
          puts "- #{ingredient.name}: #{ingredient.measurement}"
        end
      end
      
      # Test search functionality
      test_query = "margarita"
      matching_drinks = Drink.where('LOWER(name) LIKE ?', "%#{test_query.downcase}%")
      puts "\nSearch Test:"
      puts "Query '#{test_query}' matched #{matching_drinks.count} drinks:"
      matching_drinks.each do |drink|
        puts "- #{drink.name}"
      end
    else
      puts "\nNo drinks found in database!"
    end
  end
end