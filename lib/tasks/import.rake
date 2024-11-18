# lib/tasks/import.rake
namespace :data do
  desc "Import drinks from JSON file"
  task import: :environment do
    puts "Starting import process..."
    
    json_path = Rails.root.join('db', 'cocktail_recipes.json')
    puts "Reading from: #{json_path}"
    
    begin
      json_content = File.read(json_path)
      drinks_data = JSON.parse(json_content)
      
      ActiveRecord::Base.transaction do
        # Clear existing data
        puts "Clearing existing data..."
        Ingredient.delete_all
        Drink.delete_all
        
        puts "Found #{drinks_data.size} drinks to import"
        
        drinks_data.each_with_index do |drink_data, index|
          drink = Drink.create!(
            name: drink_data['name'],
            category: drink_data['category'],
            container: drink_data['container'],
            instructions: drink_data['instructions'],
            image: drink_data['image']
          )
          
          puts "Created drink: #{drink.name}"
          
          if drink_data['ingredients'].present?
            drink_data['ingredients'].each do |ingredient_data|
              drink.ingredients.create!(
                name: ingredient_data['name'],
                measurement: ingredient_data['measurement']
              )
              puts "  - Added ingredient: #{ingredient_data['name']}: #{ingredient_data['measurement']}"
            end
          end
        end
        
        puts "\n=== Import Summary ==="
        puts "Total drinks created: #{Drink.count}"
        puts "Total ingredients created: #{Ingredient.count}"
        
        # Print a sample drink for verification
        sample = Drink.first
        if sample
          puts "\nSample drink verification:"
          puts "#{sample.name}:"
          puts "Category: #{sample.category}"
          puts "Ingredients:"
          sample.ingredients.each do |ingredient|
            puts "- #{ingredient.name}: #{ingredient.measurement}"
          end
        end
      end
    rescue StandardError => e
      puts "Error during import: #{e.message}"
      puts e.backtrace
    end
  end
end