class CreateDrawings < ActiveRecord::Migration[7.1]
  def change
    create_table :drawings do |t|
      t.text :data
      t.integer :user_id
      t.integer :word_prompt_id

      t.timestamps
    end
  end
end
