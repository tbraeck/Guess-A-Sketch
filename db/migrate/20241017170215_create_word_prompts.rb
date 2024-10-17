class CreateWordPrompts < ActiveRecord::Migration[7.1]
  def change
    create_table :word_prompts do |t|
      t.string :prompt

      t.timestamps
    end
  end
end
