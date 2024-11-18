class CreateDrinks < ActiveRecord::Migration[7.1]
  def change
    create_table :drinks do |t|
      t.string :name
      t.string :category
      t.string :container
      t.text :instructions
      t.string :image

      t.timestamps
    end
  end
end
